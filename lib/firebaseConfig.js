import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAb2xLBFm9jkKt8L4-y_XTvzm82L20zVds",
  authDomain: "grammarchecker-2c902.firebaseapp.com",
  projectId: "grammarchecker-2c902",
  storageBucket: "grammarchecker-2c902.firebasestorage.app",
  messagingSenderId: "235030426855",
  appId: "1:235030426855:web:24df7a4652bd90199a1e42",
  measurementId: "G-GYLEHJ35TR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)