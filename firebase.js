import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.VITE_FIREBASE_APP_ID 
};

// initializing Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // initializing Firebase Storage
storage.maxOperationRetryTime = 120000; // 2 minutes
storage.maxUploadRetryTime = 120000; // 2 minutes

export {storage };