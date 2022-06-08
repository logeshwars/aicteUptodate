import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNE5NpRtdpETVDUusOdJJGzLXVOfWx4Ys",
    authDomain: "up2date-9f3b1.firebaseapp.com",
    projectId: "up2date-9f3b1",
    storageBucket: "up2date-9f3b1.appspot.com",
    messagingSenderId: "458881926519",
    appId: "1:458881926519:web:2a62ebbbd0401f33d00d72"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);
auth.languageCode = 'it';
const provider = new GoogleAuthProvider();
export { auth, provider,db,storage};