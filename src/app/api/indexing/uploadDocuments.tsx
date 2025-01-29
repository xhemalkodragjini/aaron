// src/lib/Firebase/uploadDocuments.ts

import { db } from '@/lib/Firebase/FirebaseConfig';
import { 
  collection, 
  doc,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
  getDoc,
  Timestamp,
} from 'firebase/firestore';

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
  const processedDocs = await processDocuments(documents);
  return processedDocs;
}

async function processDocuments(documents: DocumentToUpload[]): Promise<ProcessedDocument[]> {
  const documentsCollection = collection(db, 'documents');
  const chunksCollection = collection(db, 'chunks');
  const processedDocuments: ProcessedDocument[] = [];
  
  // Process in batches of 500 (Firestore limit)
  const batchSize = 500;
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = writeBatch(db);
    const currentBatch = documents.slice(i, i + batchSize);
    
    for (const document of currentBatch) {
      const id = generateDocumentId(document.url);
      
      // Check for existing document
      const existingDoc = await getDoc(doc(documentsCollection, id));
      
      if (existingDoc.exists()) {
        console.log(`Replacing existing document: ${id}`);
        await deleteExistingChunks(id, chunksCollection);
      }

      // Create new document
      const newDoc: ProcessedDocument = {
        id,
        url: document.url,
        indexedAt: null,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = doc(documentsCollection, id);
      batch.set(docRef, {
        ...newDoc,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
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
  chunksCollection: any
): Promise<void> {
  const chunksQuery = query(
    chunksCollection,
    where('documentId', '==', documentId)
  );
  
  const chunksSnapshot = await getDocs(chunksQuery);
  
  if (!chunksSnapshot.empty) {
    const batch = writeBatch(db);
    
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