import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAmeVNxGFJCe4nWo7zDNNa4GePbQyA93tw",
    authDomain: "upcycling-project-ex.firebaseapp.com",
    projectId: "upcycling-project-ex",
    storageBucket: "upcycling-project-ex.appspot.com",
    messagingSenderId: "763504697046",
    appId: "1:763504697046:web:7eab09dda319dcba2b3377"
};
// Initialize Firebase 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);

export { app , auth , db , firestore};