// src/app/api/indexing/scraping.ts
import { load } from 'cheerio';

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

export class DocumentScraper {
  // private embeddingService: EmbeddingService;

  // constructor(projectId: string) {
  //   // this.embeddingService = new EmbeddingService(projectId);
  // }

  async scrapeUrl(url: string): Promise<string> {
    const response = await fetch(url);
    const html = await response.text();

    // Use cheerio for lightweight HTML parsing
    const $ = load(html);

    // Target GCP doc specific structure
    const content = $('.devsite-article-body')
      .find('p, ul, ol, pre, h1, h2, h3, h4, h5, h6')
      .map((_, el) => $(el).text().trim())
      .get()
      .join('\n\n');

    return content;
  }

  // async scrapeUrl(url: string): Promise<string> {
  //   const browser = await chromium.launch();
  //   const page = await browser.newPage();

  //   // const response = await fetch(url);
  //   // const html = await response.text();

  //   try {
  //     // await page.goto(url, { waitUntil: 'networkidle' });

  //     const sections = await page.evaluate(() => {
  //       const sections: string[] = [];
  //       const body = document.querySelector('.devsite-article-body');

  //       if (!body) return [''];

  //       let paragraphs: string[] = [];
  //       const processNode = (node: Element) => {
  //         if (node.tagName === 'P' || node.tagName === 'UL') {
  //           paragraphs.push(node.textContent?.trim() || '');
  //         }
  //       };

  //       // Process first section before any h2
  //       let currentNode = body.firstElementChild;
  //       while (currentNode && currentNode.tagName !== 'H2') {
  //         processNode(currentNode);
  //         currentNode = currentNode.nextElementSibling;
  //       }
  //       sections.push(paragraphs.join(' '));

  //       // Process each h2 section
  //       const h2Elements = body.querySelectorAll('h2');
  //       h2Elements.forEach(h2 => {
  //         paragraphs = [];
  //         let nextNode = h2.nextElementSibling;

  //         while (nextNode && nextNode.tagName !== 'H2') {
  //           processNode(nextNode);
  //           nextNode = nextNode.nextElementSibling;
  //         }

  //         sections.push(paragraphs.join(' '));
  //       });

  //       return sections;
  //     });

  //     return sections.join('\n');
  //   } finally {
  //     await browser.close();
  //   }
  // }
}
