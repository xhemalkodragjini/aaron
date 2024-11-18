import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8eV17zj0jS6yetnE1fKEVG3Ztt_h5xIA",
  authDomain: "poerschmann-ce-intern.firebaseapp.com",
  projectId: "poerschmann-ce-intern",
  storageBucket: "poerschmann-ce-intern.firebasestorage.app",
  messagingSenderId: "1008828657292",
  appId: "1:1008828657292:web:18d185635fc272a2e815a9",
  measurementId: "G-VRB7R9GV3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, firebaseConfig };