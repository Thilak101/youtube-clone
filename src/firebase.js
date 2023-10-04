import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBOaugGUsRNF52xS60a6DvY7a_QfBIhFJA",
    authDomain: "yt-clone-cd748.firebaseapp.com",
    projectId: "yt-clone-cd748",
    storageBucket: "yt-clone-cd748.appspot.com",
    messagingSenderId: "829317267428",
    appId: "1:829317267428:web:ee4a40abe0bd91ac9ad1f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()
const timestamp = serverTimestamp()

export {
    app,
    db,
    auth,
    provider,
    timestamp
}