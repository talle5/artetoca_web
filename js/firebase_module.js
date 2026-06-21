import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmMnWK_NZuh1ZC5W5Pej-oJt6uAvHKnbw",
    authDomain: "learnig-firebase-535ad.firebaseapp.com",
    projectId: "learnig-firebase-535ad",
    storageBucket: "learnig-firebase-535ad.firebasestorage.app",
    messagingSenderId: "640811250767",
    appId: "1:640811250767:web:545d2896fb1e5ab67ae63a",
    measurementId: "G-6B1QCZL2YB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, query, orderBy };