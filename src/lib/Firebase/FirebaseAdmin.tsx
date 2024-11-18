// src/lib/Firebase/FirebaseAdmin.ts
import admin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore";

function formatPrivateKey(key) {
  if (!key) return undefined;
  // Remove any extra quotes and replace literal \n with newlines
  return key.replace(/\\n/g, '\n').replace(/^["']|["']$/g, '');
}

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
    !privateKey) {
      throw new Error('Missing Firebase Admin configuration');
    }

  
  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey
      })
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

// Initialize Firestore
export function getAdminDb() {
  try {
    initializeFirebaseAdmin();
    return getFirestore();
  } catch (error) {
    console.error('Error getting Firestore:', error);
    throw error;
  }
}

// Export collections for type safety
export const collections = {
  documents: (db: ReturnType<typeof getFirestore>) => db.collection('documents'),
  chunks: (db: ReturnType<typeof getFirestore>) => db.collection('chunks'),
} as const;