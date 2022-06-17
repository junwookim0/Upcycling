import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore , collection, addDoc} from "firebase/firestore"
import { GoogleAuthProvider, signInWithPopup,
    FacebookAuthProvider,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,signOut,onAuthStateChanged,getAuth
} from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyAZwe8-JumYMCPZE6NCHS7QRplQ1VQhCa8",
  authDomain: "login-97034.firebaseapp.com",
  databaseURL: "https://login-97034-default-rtdb.firebaseio.com",
  projectId: "login-97034",
  storageBucket: "login-97034.appspot.com",
  messagingSenderId: "737764108580",
  appId: "1:737764108580:web:aaea951966d9fb3b306bb1"
};
// Initialize Firebase 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);


const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        await addDoc(collection(firestore, "users"), {
            uid: user.uid,
            email: user.email,
        });
        return true
    } catch (error) {
        return {error: error.message}
    }
};
const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return true
    } catch (error) {
        return {error: error.message}
    }
};

const SignOut = async() => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        return false
    }
};

const storage = getStorage(app);

export { app , auth , db , firestore ,signIn , signUp, SignOut, storage};