// src/app/api/test-firebase/route.ts
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/Firebase/Firestore'; 
import { getAdminColl } from '@/lib/Firebase/FirestoreAdmin';

export async function GET() {
  try {
    const querySnapshot = await getCollection()
    // console.log('response: ' + querySnapshot)

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // const querySnapshot = await getAdminColl()

    const response = {
      success: true,
      documentCount: querySnapshot.length,
      documents: querySnapshot
    };

    console.log('Sending response');
    return NextResponse.json(response);

  } catch (error) {
    // Log the full error details
    console.error('Firebase test failed:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      error
    });

    // Create a safe error response
    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      errorType: error?.constructor?.name || 'Unknown'
    };

    console.log('Sending error response:', errorResponse);
    
    // Return error response with 500 status
    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}