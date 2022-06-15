// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtrGUQ5un7jl2U1cFWDyoG9nc_6lNUPsU",
  authDomain: "reactapp-instagram.firebaseapp.com",
  projectId: "reactapp-instagram",
  storageBucket: "reactapp-instagram.appspot.com",
  messagingSenderId: "257210656708",
  appId: "1:257210656708:web:13d21ca236267010296691",
  measurementId: "G-VZEQNS11G6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };