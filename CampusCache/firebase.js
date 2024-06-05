// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2WDsXIctp6l_cI88qyn60kfiyWPYygVs",
  authDomain: "campuscache-c95d3.firebaseapp.com",
  projectId: "campuscache-c95d3",
  storageBucket: "campuscache-c95d3.appspot.com",
  messagingSenderId: "1039292307792",
  appId: "1:1039292307792:web:92e5f6cfab2b5b70eb3455",
  measurementId: "G-VX3L77ZCF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
let analytics = null;

if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  // Check if Firebase Analytics is supported in this environment
  if (getAnalytics.isSupported()) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
}

export {app, db, auth, analytics}