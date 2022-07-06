import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA0rOVtt0L89LQO23_9AJ8PezEFk8e_uyg",
  authDomain: "snapchat-clone-60f15.firebaseapp.com",
  projectId: "snapchat-clone-60f15",
  storageBucket: "snapchat-clone-60f15.appspot.com",
  messagingSenderId: "492732453130",
  appId: "1:492732453130:web:0a33cbd075aedb09b42af3"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

const provider = new GoogleAuthProvider();

const storage = getStorage(firebaseApp);

export {auth, provider, storage};

export default db;