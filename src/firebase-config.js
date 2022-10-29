import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TRACKER_KEY,
  authDomain: "task-tracker-app-a962c.firebaseapp.com",
  projectId: "task-tracker-app-a962c",
  storageBucket: "task-tracker-app-a962c.appspot.com",
  messagingSenderId: "626701264587",
  appId: "1:626701264587:web:e6e3e7e89e7e91b6ea9d4e",
  measurementId: "G-YYPN534KYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)