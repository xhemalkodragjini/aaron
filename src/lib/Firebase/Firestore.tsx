import { NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";
import { db } from "@/lib/Firebase/FirebaseConfig";


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
 * Type guard to check if a response is a NextResponse error
 */
export function isErrorResponse(response: any): response is NextResponse {
  return response instanceof NextResponse && !response.ok;
}