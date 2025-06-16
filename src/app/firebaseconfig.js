import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQi71KWORjYRv4LwrLUiOlBNzX8OTM6pU",
  authDomain: "accareindia-da5c3.firebaseapp.com",
  projectId: "accareindia-da5c3",
  storageBucket: "accareindia-da5c3.firebasestorage.app",
  messagingSenderId: "167396093501",
  appId: "1:167396093501:web:b05ba9a5c9379643828454",
  measurementId: "G-N65JR6W864"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
