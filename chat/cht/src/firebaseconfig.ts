// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpHMI6MTtPcDxbZGdEiILrQWSTqKky9_s",

  authDomain: "private-chat-app-d3a15.firebaseapp.com",

  projectId: "private-chat-app-d3a15",

  storageBucket: "private-chat-app-d3a15.appspot.com",

  messagingSenderId: "697879772150",

  appId: "1:697879772150:web:1ad5ad3d254a70e34f25d7",
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

// * It Helps To User The "User-Authentication" Service
export const auth = getAuth();

// * It Helps To Use The "Files-Uploading" Service
export const storage = getStorage();

// * It Helps To Use The "Document-Based-Database" Service
export const db = getFirestore();
