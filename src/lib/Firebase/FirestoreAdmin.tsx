// import { getAdminDb, collections } from '@/lib/Firebase/FirebaseAdmin';
// import { collectSegments } from 'next/dist/build/segment-config/app/app-segments';
// import { NextResponse } from 'next/server';

// export async function getAdminColl () {
//     try {
//       console.log('fetch called' )
  
//       const db = getAdminDb();

//       console.log('db' + db)
  
//       const coll = db.collection('documents')
//       console.log('coll' + coll)
      
//       const snapshot = await coll.get();
//       console.log('snap' + snapshot)
      
//       const documents = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
  
//       console.log('Docs in storage fetched: ' + documents)
  
//       return NextResponse.json({ documents });
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 500 }
//       );
//     }
//   }