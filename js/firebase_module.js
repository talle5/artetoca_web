
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmMnWK_NZuh1ZC5W5Pej-oJt6uAvHKnbw",
    authDomain: "learnig-firebase-535ad.firebaseapp.com",
    projectId: "learnig-firebase-535ad",
    storageBucket: "learnig-firebase-535ad.firebasestorage.app",
    messagingSenderId: "640811250767",
    appId: "1:640811250767:web:545d2896fb1e5ab67ae63a",
    measurementId: "G-6B1QCZL2YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
