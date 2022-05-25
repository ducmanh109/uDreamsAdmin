import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0ZrN_-aCdjHKmYgSmsx6n-6-WiJuIR6k",
  authDomain: "udreams-d728e.firebaseapp.com",
  databaseURL:
    "https://udreams-d728e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "udreams-d728e",
  storageBucket: "udreams-d728e.appspot.com",
  messagingSenderId: "937002354146",
  appId: "1:937002354146:web:76f1fca132cf8c2ea425bb",
  measurementId: "G-Z8TF7QZXD6",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
