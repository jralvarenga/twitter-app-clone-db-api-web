// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuNIxfGflLT2LC7JAHG2ydFoR6_yMoboM",
  authDomain: "croonic-b9bf8.firebaseapp.com",
  projectId: "croonic-b9bf8",
  storageBucket: "croonic-b9bf8.appspot.com",
  messagingSenderId: "717376569351",
  appId: "1:717376569351:web:236e70c7794dd712432aa2",
  measurementId: "G-FKM21BZ10L"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const clientAuth = () => {
  const firebaseAuth = getAuth(firebaseApp)
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099')
  }
  return firebaseAuth
}