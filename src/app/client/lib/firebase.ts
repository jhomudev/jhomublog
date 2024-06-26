// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { env } from "./env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blogapp-410720.firebaseapp.com",
  projectId: "blogapp-410720",
  storageBucket: "blogapp-410720.appspot.com",
  messagingSenderId: "97034112139",
  appId: "1:97034112139:web:20b1ed4cf487acb8bc588e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);