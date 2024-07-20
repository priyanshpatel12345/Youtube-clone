// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "fir-e4c8e.firebaseapp.com",
  projectId: "fir-e4c8e",
  storageBucket: "fir-e4c8e.appspot.com",
  messagingSenderId: "571935722682",
  appId: "1:571935722682:web:046305879138b713f98683",
};

// Initialize Firebase

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export const app = initializeApp(firebaseConfig);
