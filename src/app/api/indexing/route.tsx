// src/app/api/indexing/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCollection, uploadDocumentBatch, updateDocument, uploadChunkBatch } from '@/lib/Firebase/Firestore';
import {
  DocumentFields,
  ChunkFields,
  UploadResponse,
  DocumentStatus,
  InputURLValidator,
  DocumentIdGenerator,
  BatchConfig,
} from '@/lib/Firebase/types';
import { DocumentProcessor } from './processing';


/**
 * Document ID generator that converts GCP URLs to document IDs
 */
const gcpURLDocumentIdGenerator: DocumentIdGenerator = (url: string, index: number = 0) => {
  return url
    .replace('https://cloud.google.com/', '')
    .replace(/\//g, '-')
    .replace(/-+$/, '');
};

/**
 * Validates a GCP documentation URL
 */
const validateGcpDocUrl: InputURLValidator = (url: string): boolean => {
  console.log('validating' + url)
  return url.startsWith('https://cloud.google.com/') &&
    url !== 'https://cloud.google.com/';
};


// Chunking utility function
function chunkContent(content: string): string[] {
  // Implement content chunking logic
  // This should split the content into appropriate sized chunks
  return content.split('\n\n').filter(chunk => chunk.trim().length > 0);
};

/**
 * Generates chunk IDs combining document ID and chunk index
 */
const chunkDocumentIdGenerator: DocumentIdGenerator = (id: string, index: number) => {
  return `${id}-chunk-${index}`;
};

/**
 * Define Document Processor
 */
const documentProcessor = new DocumentProcessor();


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.urls || !Array.isArray(body.urls)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request format'
      }, { status: 400 });
    }

    const batchConfig: BatchConfig<DocumentFields> = {
      colId: 'documents',
      batchSize: 500,
      baseFields: {
        status: 'pending' as DocumentStatus
      }
    };


    // Step 1 & 2: Upload documents to Firestore
    const uploadResponse: UploadResponse<DocumentFields> = await uploadDocumentBatch<DocumentFields>(
      // body.urls.map((url: string) => (url)),
      body.urls,
      batchConfig,
      gcpURLDocumentIdGenerator,
      validateGcpDocUrl
    );

    if (!uploadResponse.success) {
      return NextResponse.json({
        success: false,
        error: uploadResponse.error || 'Failed to upload documents',
        failedUploads: uploadResponse.failedUploads
      }, { status: 500 });
    }

    console.log('#### Doc upload done ####')

    // Step 2: Process each document (scrape, chunk, embed)
    const processingPromises = uploadResponse.documents.map(doc =>
      documentProcessor.processDocument(doc)
        .catch(error => {
          console.error(`Failed to process document ${doc.id}:`, error);
          return error;
        })
    );

    Promise.all(processingPromises);

    return NextResponse.json({
      success: true,
      message: `Started processing ${uploadResponse.documents.length} documents`,
      documents: uploadResponse.documents,
      failedUploads: uploadResponse.failedUploads
    });

  } catch (error) {
    console.error('Error in indexing route:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}


// GET route to fetch all docs in Firebase Storage
export async function GET() {
  try {
    // console.log('fetch called')

    const documents = await getCollection("documents")

    // console.log('Docs in storage fetched: ' + documents)

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}