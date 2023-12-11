// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0aOtlSxkJinzo92FebD8E0sssE7j-djY",
  authDomain: "olx-clone-7c983.firebaseapp.com",
  projectId: "olx-clone-7c983",
  storageBucket: "olx-clone-7c983.appspot.com",
  messagingSenderId: "241421343071",
  appId: "1:241421343071:web:b1fee4820e3c0be014beea",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export default storage;
export { auth, provider };
