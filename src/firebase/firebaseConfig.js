// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7zA_LAp2X51L5WDuBwtcQE7QOkexaCmc",
  authDomain: "ichat-61a75.firebaseapp.com",
  databaseURL: "https://ichat-61a75-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ichat-61a75",
  storageBucket: "ichat-61a75.firebasestorage.app",
  messagingSenderId: "204332651343",
  appId: "1:204332651343:web:eaad1a3038e2f0399a2b3a",
  measurementId: "G-ZM6QCHJGSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth so you can use it in your app
const auth = getAuth(app);

export { auth };