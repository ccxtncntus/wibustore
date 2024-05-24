import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAewrVUyY0R_Dsm4MryGhq6U_q_ohpygtA',
  authDomain: 'wibustore-6e314.firebaseapp.com',
  projectId: 'wibustore-6e314',
  storageBucket: 'wibustore-6e314.appspot.com',
  messagingSenderId: '849213907619',
  appId: '1:849213907619:web:4a81932bfdd2d839949516',
  measurementId: 'G-ES143V6M0K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
