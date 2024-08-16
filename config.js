// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyC_KnEO2AoVUfw9FkTpevkP8okW9cAK5eQ",
    authDomain: "js-mini-hackathon.firebaseapp.com",
    projectId: "js-mini-hackathon",
    storageBucket: "js-mini-hackathon.appspot.com",
    messagingSenderId: "168805800539",
    appId: "1:168805800539:web:17c2949aaeb87de37f7d7e",
    measurementId: "G-M8B1WG08PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

