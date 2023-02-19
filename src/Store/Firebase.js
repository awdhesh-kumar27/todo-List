import React from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import {getAuth ,signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBREuP2OO1UwHmiMEb_4Vjm2tYs2hBRPKw",
  authDomain: "todo-list-a1b58.firebaseapp.com",
  projectId: "todo-list-a1b58",
  storageBucket: "todo-list-a1b58.appspot.com",
  messagingSenderId: "75717516397",
  appId: "1:75717516397:web:190e24df9127496df9f364",
  measurementId: "G-68CGYLVNN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


export default app;