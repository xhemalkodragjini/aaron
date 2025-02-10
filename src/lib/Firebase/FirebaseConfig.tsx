import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyqDItf75H84iH_0mOcQcn8MnK_zF5dR8",
  authDomain: "knowledge-navigator-449510.firebaseapp.com",
  projectId: "knowledge-navigator-449510",
  storageBucket: "knowledge-navigator-449510.firebasestorage.app",
  messagingSenderId: "350463476222",
  appId: "1:350463476222:web:1e1bb9a25220a3a2bf00af"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const app = getApps().length === 0 ? initializeApp() : getApps()[0];

// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { app, db };