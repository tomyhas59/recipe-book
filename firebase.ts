import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADZJ16Syi9oh5XX9rKlP973HGH9H-HswM",
  authDomain: "tmsrecipe.firebaseapp.com",
  projectId: "tmsrecipe",
  storageBucket: "tmsrecipe.firebasestorage.app",
  messagingSenderId: "1046328025180",
  appId: "1:1046328025180:web:e17db2d8df287f3b964699",
  measurementId: "G-Y3097SZSGX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
