import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);

export { app , auth , db , firestore};