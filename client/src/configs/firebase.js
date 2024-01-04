// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAefxpD5m-j31-YVH2EJcPeH8rUOYrGPo",
  authDomain: "duan-388202.firebaseapp.com",
  projectId: "duan-388202",
  storageBucket: "duan-388202.appspot.com",
  messagingSenderId: "723762367024",
  appId: "1:723762367024:web:0996ed760defe232f37bf5",
  measurementId: "G-VD8L5FP6VV",
};

// Initialize Firebase
const storageFirebase = initializeApp(firebaseConfig);
export default storageFirebase;
// const analytics = getAnalytics(app);
