import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD32p6IzjJOYZFm1ofRHeZC58tLQ0Aqc6g",
  authDomain: "project-cost-tracker-bb98a.firebaseapp.com",
  projectId: "project-cost-tracker-bb98a",
  storageBucket: "project-cost-tracker-bb98a.appspot.com", // ✅ fixed
  messagingSenderId: "820535686131",
  appId: "1:820535686131:web:54d1c894b51178cd889886",
  measurementId: "G-9K65KPZ0WL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
