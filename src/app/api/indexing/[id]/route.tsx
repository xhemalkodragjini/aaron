// src/app/api/indexing/[id]/route.ts
import { NextResponse } from 'next/server';
import { getAdminDb, collections } from '@/lib/Firebase/FirebaseAdmin';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {

    if (!params.id) {
        return NextResponse.json(
            { success: false, error: 'Document ID is required' },
            { status: 400 }
        );
    }

    try {
        const db = getAdminDb();

        // Delete chunks first
        const chunksRef = collections.chunks(db);
        const chunks = await chunksRef
            .where('documentId', '==', params.id)
            .get();

        const batch = db.batch();
        chunks.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        // Delete document
        batch.delete(collections.documents(db).doc(params.id));

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