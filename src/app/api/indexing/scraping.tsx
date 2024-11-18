// src/app/api/indexing/scraping.ts
import { chromium } from 'playwright';
import { ChunkingConfig, chunkSection, optimizeChunksForEmbedding } from './chunking';
import { EmbeddingService } from './embedding';
import { getAdminDb, collections } from '@/lib/Firebase/FirebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export interface DocumentMetadata {
  title: string;
  lastUpdated?: string;
  section?: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  content: string;
  metadata: DocumentMetadata & {
    chunkIndex: number;
    totalChunks: number;
  };
}

export class DocumentProcessor {
  private embeddingService: EmbeddingService;

  constructor(projectId: string) {
    this.embeddingService = new EmbeddingService(projectId);
  }

  async processDocument(documentId: string, url: string): Promise<void> {
    const db = getAdminDb();
    const docRef = collections.documents(db).doc(documentId);

    try {
      // Update status to processing
      await docRef.update({
        status: 'processing',
        updatedAt: Timestamp.now()
      });

      // Scrape content sections
      const sections = await this.scrapeUrl(url);

      console.log('doc sections: ' + sections)

      // Process content sections
      let allChunks: DocumentChunk[] = [];
      for (const [index, section] of sections.entries()) {
        const sectionChunks = this.createChunks(section, documentId, {
          section: `Section ${index + 1}`
        });
        allChunks = [...allChunks, ...sectionChunks];
      }

      // Generate embeddings for all chunks
      const embeddings = await this.generateEmbeddings(allChunks.map(c => c.content));

      // Store chunks and embeddings
      await this.storeChunks(documentId, allChunks, embeddings);

      // Update document status
      await docRef.update({
        status: 'indexed',
        indexedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

    } catch (error) {
      console.error(`Error processing document ${documentId}:`, error);
      await docRef.update({
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        updatedAt: Timestamp.now()
      });
      throw error;
    }
  }

  private async scrapeUrl(url: string): Promise<string[]> {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      const sections = await page.evaluate(() => {
        const sections: string[] = [];
        const body = document.querySelector('.devsite-article-body');

        if (!body) return [''];

        let paragraphs: string[] = [];
        const processNode = (node: Element) => {
          if (node.tagName === 'P' || node.tagName === 'UL') {
            paragraphs.push(node.textContent?.trim() || '');
          }
        };

        // Process first section before any h2
        let currentNode = body.firstElementChild;
        while (currentNode && currentNode.tagName !== 'H2') {
          processNode(currentNode);
          currentNode = currentNode.nextElementSibling;
        }
        sections.push(paragraphs.join(' '));

        // Process each h2 section
        const h2Elements = body.querySelectorAll('h2');
        h2Elements.forEach(h2 => {
          paragraphs = [];
          let nextNode = h2.nextElementSibling;

          while (nextNode && nextNode.tagName !== 'H2') {
            processNode(nextNode);
            nextNode = nextNode.nextElementSibling;
          }

          sections.push(paragraphs.join(' '));
        });

        return sections;
      });

      return sections.filter(section => section.trim() !== '');
    } finally {
      await browser.close();
    }
  }

  private createChunks(
    content: string,
    documentId: string,
    metadata: Partial<DocumentMetadata> = {}
  ): DocumentChunk[] {
    // Use the chunking utility to split the content
    const chunks = chunkSection(content);

    // Optimize chunks for embedding
    const optimizedChunks = optimizeChunksForEmbedding(chunks);

    // Process chunks into storable format
    return optimizedChunks.map((content, index) => ({
      id: `${documentId}-chunk-${index}`,
      documentId,
      content,
      metadata: {
        ...metadata,
        chunkIndex: index,
        totalChunks: optimizedChunks.length
      }
    }));
  }

  private async generateEmbeddings(contents: string[]): Promise<number[][]> {
    return await this.embeddingService.getEmbeddings(contents);
  }

  private async storeChunks(
    documentId: string,
    chunks: DocumentChunk[],
    embeddings: number[][]
  ): Promise<void> {
    const db = getAdminDb();
    const batch = db.batch();
    const chunksCollection = collections.chunks(db);

    chunks.forEach((chunk, index) => {
      const chunkRef = chunksCollection.doc(chunk.id);
      batch.set(chunkRef, {
        ...chunk,
        embedding: embeddings[index],
        createdAt: Timestamp.now()
      });
    });

    await batch.commit();
  }
}

// Export a function to start the indexing pipeline
export async function startIndexingPipeline(documentId: string): Promise<void> {
  const db = getAdminDb();
  const docRef = collections.documents(db).doc(documentId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error('Document not found');
  }

  const data = doc.data();
  if (!data) {
    throw new Error('Document data is empty');
  }

  const processor = new DocumentProcessor(process.env.GCP_PROJECT_ID!);
  await processor.processDocument(documentId, data.url);
}