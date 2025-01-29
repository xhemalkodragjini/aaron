// src/lib/Firebase/Firestore.tsx

import { NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  setDoc,
  writeBatch,
  DocumentReference
} from "firebase/firestore";
import { db } from "@/lib/Firebase/FirebaseConfig";
import {
  BaseFields,
  DocumentFields,
  ChunkFields,
  DocumentStatus,
  UploadResponse,
  DocumentIdGenerator,
  InputURLValidator,
  BatchConfig,
  FailedUpload
} from './types';

import { Firestore } from "@google-cloud/firestore";

/**
 * Fetches all documents from a specified collection
 * @param colId The collection ID
 * @returns Array of documents with their IDs and data
 */
export async function getCollection(colId: string) {
  try {
    const q = query(collection(db, colId));
    const querySnapshot = await getDocs(q);
    const documents: { id: string; data: DocumentData }[] = [];

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      documents.push({
        id: doc.id,
        data: doc.data()
      });
    });
    return documents;

  } catch (error) {

    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      errorType: error?.constructor?.name || 'Unknown'
    };
    console.error('Collection fetch failed:', error);

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

/**
 * Fetches a single document from a specified collection
 * @param colId The collection ID
 * @param docId The document ID
 * @returns Document data with ID or error response
 */
export async function getDocument(colId: string, docId: string) {
  try {
    const docRef = doc(db, colId, docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Document not found'
      }, {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return {
      id: docSnap.id,
      data: docSnap.data()
    };

  } catch (error) {
    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      errorType: error?.constructor?.name || 'Unknown'
    };
    console.error('Document fetch failed:', error);

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

/**
 * Uploads a single document to Firestore
 * @param url The GCP documentation URL
 * @param baseFields Base fields to include in the document
 * @param colId The collection ID (defaults to 'documents')
 * @param generateId Function to generate document ID
 * @returns UploadResponse with success status and document ID or error
 */
export async function uploadDocument<T extends BaseFields>(
  url: string,
  baseFields: Partial<T>,
  colId: string,
  generateId: DocumentIdGenerator,
  validateUrl: InputURLValidator,
): Promise<UploadResponse<T>> {
  try {
    // Validate URL
    if (!validateUrl(url)) {
      return {
        success: false,
        error: 'Invalid GCP documentation URL',
        documents: []
      };
    }

    const documentId = generateId(url, 0);
    const docRef = doc(db, colId, documentId);

    const timestamp = Timestamp.now();
    const documentData = {
      ...baseFields,
      createdAt: timestamp,
      updatedAt: timestamp,
    } as T;

    await setDoc(docRef, documentData);

    return {
      success: true,
      documents: [{
        id: documentId,
        data: documentData
      }],
    };

  } catch (error) {
    console.error('Document upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      documents: []
    };
  }
}

/**
 * Uploads multiple documents to Firestore in batches
 * @param urls Array of GCP documentation URLs
 * @param config BatchConfig object containing collection ID, ID generator, batch size, and base fields
 * @returns UploadResponse with success status and failed uploads if any
 */
export async function uploadDocumentBatch<T extends DocumentFields>(
  urls: string[],
  config: BatchConfig<T>,
  generateId: DocumentIdGenerator,
  validateGcpDocUrl: InputURLValidator
): Promise<UploadResponse<T>> {
  const {
    colId,
    batchSize = 500,
    baseFields = {}
  } = config;

  const failedUploads: FailedUpload[] = [];

  console.log('Document URLS to be uploaded to Firestore: ' + urls)

  try {
    const timestamp = Timestamp.now();
    const processedDocs: Array<{
      id: string;
      data: T;
    }> = [];;

    // Process in batches of batchSize
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchUrls = urls.slice(i, i + batchSize);

      for (const url of batchUrls) {
        const documentId = generateId(url, 0);
        const collectionId = colId || 'documents';
        const docRef = doc(db, collectionId, documentId);

        const documentData = {
          url: url,
          status: 'pending' as DocumentStatus,
          createdAt: timestamp,
          updatedAt: timestamp,
          ...baseFields,
        } as T;

        batch.set(docRef, documentData);
        processedDocs.push({
          id: documentId,
          data: documentData
        });
      }

      await batch.commit();
    }

    return {
      success: true,
      documents: processedDocs,
      failedUploads: failedUploads.length > 0 ? failedUploads : undefined
    };

  } catch (error) {
    console.error('Batch upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      failedUploads,
      documents: []
    };
  }
}

/**
 * Generic batch upload function for Firestore documents
 * @param items Array of items to be uploaded
 * @param config Batch configuration including collection ID and base fields
 * @returns UploadResponse with success status and processed documents
 */
export async function uploadChunkBatch<T extends ChunkFields>(
  items: ChunkFields[],
  config: BatchConfig<T>
): Promise<UploadResponse<T>> {
  console.log('🟦 Starting uploadChunkBatch');
  console.log(`🟦 Received ${items.length} chunks to upload`);

  if (!Array.isArray(items) || items.length === 0) {
    console.warn('🟡 No chunks provided for upload');
    return {
      success: false,
      error: 'No chunks provided',
      documents: []
    };
  }

  const {
    colId = 'chunks',
    batchSize = 500
  } = config;

  const processedItems: Array<{ id: string; data: T }> = [];
  const failedItems: Array<{ url: string; error: string }> = [];
  const timestamp = Timestamp.now();

  try {
    // Log first chunk structure for debugging
    if (items[0]) {
      console.log('🟦 First chunk structure:', JSON.stringify({
        documentId: items[0].documentId,
        chunkId: items[0].chunkId,
        contentLength: items[0].content.length,
        chunkIndex: items[0].chunkIndex,
        totalChunks: items[0].totalChunks
      }, null, 2));
    }

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = writeBatch(db);
      const currentBatch = items.slice(i, i + batchSize);

      console.log(`🟦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)}`);

      for (const item of currentBatch) {
        try {
          // Validate required fields
          if (!item.chunkId || !item.documentId || !item.content) {
            const missingFields = [];
            if (!item.chunkId) missingFields.push('chunkId');
            if (!item.documentId) missingFields.push('documentId');
            if (!item.content) missingFields.push('content');

            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
          }

          const docData = {
            documentId: item.documentId,
            chunkId: item.chunkId,
            content: item.content,
            context: item.context || '',
            embedding: item.embedding || [],
            chunkIndex: item.chunkIndex,
            totalChunks: item.totalChunks,
            createdAt: timestamp,
            updatedAt: timestamp
          } as T;


          const docRef = doc(db, colId, item.chunkId);
          batch.set(docRef, docData);

          // console.log(`🟦 Added chunk ${item.chunkId} to batch`);
          processedItems.push({ id: item.chunkId, data: docData });
        } catch (itemError) {
          console.error(`🔴 Error processing chunk:`, {
            error: itemError instanceof Error ? itemError.message : String(itemError),
            chunkId: item.chunkId
          });
          failedItems.push({
            url: item.chunkId,
            error: itemError instanceof Error ? itemError.message : 'Failed to process item'
          });
        }
      }

      try {
        console.log(`🟦 Committing batch ${Math.floor(i / batchSize) + 1}...`);
        await batch.commit();
        console.log(`🟢 Successfully committed batch ${Math.floor(i / batchSize) + 1}`);
      } catch (batchError) {
        console.error('🔴 Batch commit failed:', {
          error: batchError instanceof Error ? batchError.message : String(batchError),
          batchNumber: Math.floor(i / batchSize) + 1
        });
        currentBatch.forEach(item => {
          failedItems.push({
            url: item.chunkId,
            error: batchError instanceof Error ? batchError.message : 'Batch commit failed'
          });
        });
      }
    }

    const result = {
      success: failedItems.length === 0,
      documents: processedItems,
      failedUploads: failedItems.length > 0 ? failedItems : undefined
    };

    console.log('🟢 Chunk upload completed:', {
      successful: processedItems.length,
      failed: failedItems.length,
      success: result.success
    });

    return result;

  } catch (error) {
    console.error('🔴 Chunk batch upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      failedUploads: failedItems,
      documents: processedItems
    };
  }
}


/**
 * Updates any document in Firestore with a type that extends BaseFields
 * @param collectionId The collection containing the document
 * @param documentId The ID of the document to update
 * @param updatedFields Fields to update on the document
 * @returns Promise<boolean> indicating success/failure
 */
export async function updateDocument<T extends BaseFields>(
  collectionId: string,
  documentId: string,
  updatedFields: Partial<T>
): Promise<boolean> {
  try {
    const docRef: DocumentReference = doc(db, collectionId, documentId);

    const updateData = {
      ...updatedFields,
      updatedAt: Timestamp.now()
    };

    await setDoc(docRef, updateData, { merge: true });
    return true;

  } catch (error) {
    console.error(`Error updating document ${documentId} in collection ${collectionId}:`, error);
    return false;
  }
}


/**
 * Updates any document in Firestore with a type that extends BaseFields
 * @param collectionId The collection containing the document
 * @param documentId The ID of the document to update
 * @param updatedFields Fields to update on the document
 * @returns Promise<boolean> indicating success/failure
 */
export async function batchUpdateDocuments<T extends ChunkFields>(
  collectionId: string = 'chunks',
  updatedRecordsArr: Array<{
    id: string;
    updatedFields: Partial<T>;
  }>,
  batchSize: number = 500
): Promise<boolean> {

  const db = new Firestore({
    projectId:"poerschmann-ce-intern",
    // keyFilename: "poerschmann-ce-intern-firebase-adminsdk-laexk-33fb4db8dc.json",
    credentials: {
      client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY}
  });
  console.log("Firestore Instance: ", db)

  try {
    for (let i = 0; i < updatedRecordsArr.length; i += batchSize) {
      const batch = db.batch();
      const currentBatch = updatedRecordsArr.slice(i, i + batchSize);

      // Make the loop asynchronous
      for (const { id, updatedFields } of currentBatch) {
        const docRef = db.doc(`${collectionId}/${id}`);
        const docSnap = await docRef.get();

        const previousContent = docSnap.data();
        batch.set(docRef, {
          ...previousContent,
          ...updatedFields,
        });
      }

      await batch.commit();
    }
    return true;

  } catch (error) {
    console.error('Batch update failed:', error);
    return false;
  }
}
