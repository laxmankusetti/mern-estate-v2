// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-v2.firebaseapp.com",
  projectId: "mern-estate-v2",
  storageBucket: "mern-estate-v2.appspot.com",
  messagingSenderId: "932123115111",
  appId: "1:932123115111:web:ee5aa3d0a8a6cd29865ec2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);