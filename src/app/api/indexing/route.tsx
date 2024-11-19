// src/app/api/indexing/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadDocuments, FirestoreUploadError } from './uploadDocuments';
import { getCollection } from '@/lib/Firebase/Firestore';
import { startIndexingPipeline } from './scraping';

// POST route to trigger indexing pipeline
export async function POST(request: NextRequest) {
  console.log('Indexing API route called');

  try {
    const body = await request.json();

    if (!body?.urls || !Array.isArray(body.urls)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request format'
      }, { status: 400 });
    }

    const { urls } = body;
    console.log('Processing URLs:', urls);

    // Validate URLs
    const invalidUrls = urls.filter(url =>
      !url.startsWith('https://cloud.google.com/') ||
      url === 'https://cloud.google.com/'
    );

    if (invalidUrls.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid URLs detected',
        invalidUrls
      }, { status: 400 });
    }

    // 1. Convert URLs to document objects & Upload documents to Firestore
    const documentsToUpload = urls.map(url => ({ url }));
    const processedDocuments = await uploadDocuments(documentsToUpload);
    console.log('#### Upload Done ####')


    // 2. Start indexing pipeline for each document
    const indexingPromises = processedDocuments.map(doc =>
      startIndexingPipeline(doc.id)
        .catch(error => {
          console.error(`Error indexing document ${doc.id}:`, error);
          return error;
        })
    );
    console.log('#### Indexing Done ####')

    // Wait for all indexing operations to complete
    await Promise.allSettled(indexingPromises);

    return NextResponse.json({
      success: true,
      documents: processedDocuments,
      message: `Successfully processed ${processedDocuments.length} documents`
    });

  } catch (error) {
    console.error('Error processing request:', error);

    // Handle specific Firestore upload errors
    if (error instanceof FirestoreUploadError) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error.details
      }, { status: 500 });
    }

    // Handle other errors
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
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