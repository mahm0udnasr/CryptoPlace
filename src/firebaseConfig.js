import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC5CKYF84M0ecWp5jqfRysCyVWjviMgta8",
  authDomain: "crypt0-blog.firebaseapp.com",
  projectId: "crypt0-blog",
  storageBucket: "crypt0-blog.appspot.com",
  messagingSenderId: "687274876850",
  appId: "1:687274876850:web:008067008caace14748eab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };