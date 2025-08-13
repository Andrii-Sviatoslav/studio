import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your own Firebase project configuration.
const firebaseConfig = {
  apiKey: "AIzaSyCNSM4KFD-ZSqCbxy5YD5ibp_GL41mWBo0",
  authDomain: "apex-finance-fex82.firebaseapp.com",
  projectId: "apex-finance-fex82",
  storageBucket: "apex-finance-fex82.firebasestorage.app",
  messagingSenderId: "972854889666",
  appId: "1:972854889666:web:77bcfd6ff537f0dfc5bf5b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
