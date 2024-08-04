import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTR-pIQhNHAhGZs4FPNC5ZvjhFDZuoFTU",
  authDomain: "whatsapp-clone-c7945.firebaseapp.com",
  projectId: "whatsapp-clone-c7945",
  storageBucket: "whatsapp-clone-c7945.appspot.com",
  messagingSenderId: "377432668460",
  appId: "1:377432668460:web:ea7c96040c428736fad489",
  measurementId: "G-ZKSPCSHSZ0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app)