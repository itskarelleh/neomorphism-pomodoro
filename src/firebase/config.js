// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { } from "firebase/"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKtjQcpEVJCpGbu8htGX7EF_u40tqs1cg",
  authDomain: "pomodoro-timer-db421.firebaseapp.com",
  projectId: "pomodoro-timer-db421",
  storageBucket: "pomodoro-timer-db421.appspot.com",
  messagingSenderId: "840129482756",
  appId: "1:840129482756:web:2cfef3a3373dbd953f2551",
  measurementId: "G-CSY7X81JGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
