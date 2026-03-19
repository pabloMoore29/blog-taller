import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFCcXSL94VYjjCn4KRBHi29U39LmM2w7U",
  authDomain: "blog-taller-39c6b.firebaseapp.com",
  projectId: "blog-taller-39c6b",
  storageBucket: "blog-taller-39c6b.firebasestorage.app",
  messagingSenderId: "10366231559",
  appId: "1:10366231559:web:46bcf33e3851ddf4cbb6a2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };