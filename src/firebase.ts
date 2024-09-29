// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLsXlIw2ETJ331zyD0lG6NFqERETZx6Xg",
    authDomain: "animelist-ff3f2.firebaseapp.com",
    projectId: "animelist-ff3f2",
    storageBucket: "animelist-ff3f2.appspot.com",
    messagingSenderId: "835472281781",
    appId: "1:835472281781:web:916e1c04c4eb0bef1aeefc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const gitProv = new GithubAuthProvider();

export {db, auth, googleProvider, gitProv}


export default app;