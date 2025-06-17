import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhOTdNEgk3TFHxZ0HQ7M36hQ4226TSepM",
  authDomain: "dados-coletados-b21ea.firebaseapp.com",
  projectId: "dados-coletados-b21ea",
  storageBucket: "dados-coletados-b21ea.firebasestorage.app",
  messagingSenderId: "515088113331",
  appId: "1:515088113331:web:11db06e145324db9219ac6",
  measurementId: "G-V13K0P73GJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
