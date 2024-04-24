// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwbwC71UlatOgRHta6JAqrBz6hjLb8W5k",
  authDomain: "maticando-sabores.firebaseapp.com",
  projectId: "maticando-sabores",
  storageBucket: "maticando-sabores.appspot.com",
  messagingSenderId: "57486617199",
  appId: "1:57486617199:web:ad60a7c766f72836e23b9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore service
const db = getFirestore()
export default db