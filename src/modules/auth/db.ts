import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrcQQ_0T9oZgYV2jbfX0tu7bRWDZ9IfaM",
  authDomain: "marin-zadatak-prototyp.firebaseapp.com",
  projectId: "marin-zadatak-prototyp",
  storageBucket: "marin-zadatak-prototyp.appspot.com",
  messagingSenderId: "818337424772",
  appId: "1:818337424772:web:f6ae951dea20855c4269d1",
  measurementId: "G-98KH8JZRJZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const singInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
