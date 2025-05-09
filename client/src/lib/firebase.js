import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5UK8kFV4Nxpnxu0F4omHL_TOV7Dlg8R0",
  authDomain: "solarwise-althub.firebaseapp.com",
  projectId: "solarwise-althub",
  storageBucket: "solarwise-althub.firebasestorage.app",
  messagingSenderId: "404499647033",
  appId: "1:404499647033:web:d680dfa3e40b1caa99dbe8",
  measurementId: "G-KTVS4NK14L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();