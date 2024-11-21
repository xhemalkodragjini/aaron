// src/app/api/indexing/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/Firebase/FirebaseConfig';
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    writeBatch, 
    doc,
    DocumentReference
} from 'firebase/firestore';


const BATCH_SIZE = 100; // Firestore recommends keeping batches under 500 operations

async function deleteInBatches(chunksToDelete: DocumentReference[], documentRef: DocumentReference) {
    // Process chunks in batches
    for (let i = 0; i < chunksToDelete.length; i += BATCH_SIZE) {
        const batch = writeBatch(db);
        
        // Get current batch of chunks
        const currentBatchChunks = chunksToDelete.slice(i, i + BATCH_SIZE);
        
        // Add chunk deletions to current batch
        currentBatchChunks.forEach(chunkRef => {
            batch.delete(chunkRef);
        });

        // If this is the last batch and there's room, include the main document deletion
        const isLastBatch = i + BATCH_SIZE >= chunksToDelete.length;
        const hasRoomInBatch = currentBatchChunks.length < BATCH_SIZE;
        
        if (isLastBatch && hasRoomInBatch) {
            batch.delete(documentRef);
        }

        // Commit current batch
        await batch.commit();
        
        // Small delay between batches to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // If the document wasn't deleted in the last chunk batch, delete it separately
    if (chunksToDelete.length % BATCH_SIZE === 0) {
        const finalBatch = writeBatch(db);
        finalBatch.delete(documentRef);
        await finalBatch.commit();
    }
}

export async function DELETE(
    request: Request,
    context: { params: { id: string } }
) {
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
        const documentRef = doc(db, 'documents', id);
        
        // Get array of chunk references
        const chunkRefs = chunksSnapshot.docs.map(doc => doc.ref);
        
        // Log the number of chunks being deleted
        console.log(`Deleting document ${id} with ${chunkRefs.length} chunks`);

        // Process deletions in batches
        await deleteInBatches(chunkRefs, documentRef);

        return NextResponse.json({ 
            success: true,
            deletedChunks: chunkRefs.length
        });

    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Unknown error',
                code: error?.code
            },
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