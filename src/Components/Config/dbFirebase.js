
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8aGnZYjhCTopgdNhuykWvmkJSHKj_h7E",
  authDomain: "bonnie-d17be.firebaseapp.com",
  databaseURL: "https://bonnie-d17be-default-rtdb.firebaseio.com",
  projectId: "bonnie-d17be",
  storageBucket: "bonnie-d17be.appspot.com",
  messagingSenderId: "397471611615",
  appId: "1:397471611615:web:3f6a743f4770ff8718c76a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const  authentication = getAuth(app);
export const database = getFirestore(app);

export default app;