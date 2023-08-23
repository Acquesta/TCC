// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbY3mR_FrGR70807_x2GQ21UHyu3WqQ5I",
  authDomain: "gestechdb.firebaseapp.com",
  projectId: "gestechdb",
  storageBucket: "gestechdb.appspot.com",
  messagingSenderId: "299154456680",
  appId: "1:299154456680:web:5d1c16fb4f8cf518e57bdd",
  measurementId: "G-0306LTT302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth