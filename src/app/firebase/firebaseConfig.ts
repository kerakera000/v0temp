import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyRQes3AextInAbCEvcxqaf-t5FmALccY",
  authDomain: "personalgymlp-hirose.firebaseapp.com",
  projectId: "personalgymlp-hirose",
  storageBucket: "personalgymlp-hirose.firebasestorage.app",
  messagingSenderId: "1069944345257",
  appId: "1:1069944345257:web:71d7416dae2ef604aa8fb8",
  measurementId: "G-EQT5CT7F75"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

// Analytics should only be initialized on the client side
if (typeof window !== 'undefined') {
  import('firebase/analytics').then((analytics) => {
    analytics.getAnalytics(app);
  });
}

