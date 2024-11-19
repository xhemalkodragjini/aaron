// src/app/api/indexing/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/Firebase/FirebaseConfig';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  writeBatch, 
  doc
} from 'firebase/firestore';

export async function DELETE(
    request: Request,
    context: { params: { id: string } }
) {
    // Await the params
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json(
            { success: false, error: 'Document ID is required' },
            { status: 400 }
        );
    }

    try {
        // Create query for chunks
        const chunksCollection = collection(db, 'chunks');
        const chunksQuery = query(
            chunksCollection,
            where('documentId', '==', id)
        );
        
        // Get chunks
        const chunksSnapshot = await getDocs(chunksQuery);

        // Create a batch operation
        const batch = writeBatch(db);

        // Add chunk deletions to batch
        chunksSnapshot.docs.forEach(chunk => {
            batch.delete(chunk.ref);
        });

        // Add main document deletion to batch
        const documentRef = doc(db, 'documents', id);
        batch.delete(documentRef);

        // Execute the batch
        await batch.commit();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// src/app/api/indexing/[id]/reindex/route.ts
// import { startIndexingPipeline } from '../../indexing';

// export async function POST(
//     request: Request,
//     { params }: { params: { id: string } }
// ) {
//     if (!params.id) {
//         return NextResponse.json(
//             { success: false, error: 'Document ID is required' },
//             { status: 400 }
//         );
//     }

//     try {
//         await startIndexingPipeline(params.id);
//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error('Error reindexing document:', error);
//         return NextResponse.json(
//             { success: false, error: error.message },
//             { status: 500 }
//         );
//     }
// }