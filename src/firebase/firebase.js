import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5tuyNOrZhUUIx6rmSamRauvYtmva-QFo",
  authDomain: "wedding-app-87786.firebaseapp.com",
  projectId: "wedding-app-87786",
  storageBucket: "wedding-app-87786.appspot.com",
  messagingSenderId: "185983619509",
  appId: "1:185983619509:web:02b633e564c1bacca689fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const imageDb = getStorage(app)
export default app;