// src/lib/Firebase/uploadDocuments.ts

import { getAdminDb, collections } from '@/lib/Firebase/FirebaseAdmin';
import { Timestamp, Firestore } from 'firebase-admin/firestore';

interface DocumentToUpload {
  url: string;
}

interface ProcessedDocument {
  id: string;
  url: string;
  indexedAt: null;
  status: 'pending' | 'indexed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class FirestoreUploadError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'FirestoreUploadError';
  }
}

export async function uploadDocuments(documents: DocumentToUpload[]): Promise<ProcessedDocument[]> {
  const db = getAdminDb();
  const processedDocs = await processDocuments(documents, db);
  
  return processedDocs;
}

async function processDocuments(
  documents: DocumentToUpload[], 
  db: Firestore
): Promise<ProcessedDocument[]> {
  const documentsCollection = collections.documents(db);
  const chunksCollection = collections.chunks(db);
  const processedDocuments: ProcessedDocument[] = [];
  
  // Process in batches of 500 (Firestore limit)
  const batchSize = 500;
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = db.batch();
    const currentBatch = documents.slice(i, i + batchSize);
    
    for (const doc of currentBatch) {
      const id = generateDocumentId(doc.url);
      
      // Check for existing document
      const existingDoc = await documentsCollection.doc(id).get();
      
      if (existingDoc.exists) {
        console.log(`Replacing existing document: ${id}`);
        await deleteExistingChunks(id, chunksCollection);
      }

      // Create new document
      const newDoc: ProcessedDocument = {
        id,
        url: doc.url,
        indexedAt: null,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = documentsCollection.doc(id);
      batch.set(docRef, newDoc);
      processedDocuments.push(newDoc);
    }

    // Commit the current batch
    try {
      await batch.commit();
      console.log(`Successfully processed batch of ${currentBatch.length} documents`);
    } catch (error) {
      throw new FirestoreUploadError(
        'Failed to upload documents batch', 
        { error, failedBatch: currentBatch }
      );
    }
  }

  return processedDocuments;
}

async function deleteExistingChunks(
  documentId: string, 
  chunksCollection: FirebaseFirestore.CollectionReference
): Promise<void> {
  const chunksSnapshot = await chunksCollection
    .where('documentId', '==', documentId)
    .get();
  
  if (!chunksSnapshot.empty) {
    const db = getAdminDb();
    const batch = db.batch();
    
    chunksSnapshot.docs.forEach(chunkDoc => {
      batch.delete(chunkDoc.ref);
    });
    
    await batch.commit();
    console.log(`Deleted ${chunksSnapshot.size} chunks for document ${documentId}`);
  }
}

function generateDocumentId(url: string): string {
  return url
    .replace('https://cloud.google.com/', '')
    .replace(/\//g, '-')
    .replace(/-+$/, '');
}