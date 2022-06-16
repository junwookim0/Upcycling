import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore , collection, addDoc} from "firebase/firestore"
import { GoogleAuthProvider, signInWithPopup,
    FacebookAuthProvider,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,signOut,onAuthStateChanged,getAuth
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBoX4JqMqLdCoJM7g0EiZor0VcdiqTcDwo",
    authDomain: "fir-test-login-85c6c.firebaseapp.com",
    projectId: "fir-test-login-85c6c",
    storageBucket: "fir-test-login-85c6c.appspot.com",
    messagingSenderId: "366758576094",
    appId: "1:366758576094:web:ed6d85b8de98363efa674f"
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

export { app , auth , db , firestore ,signIn , signUp, SignOut};