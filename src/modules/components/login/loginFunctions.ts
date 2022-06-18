import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, singInWithGoogle } from "../../auth/db";

const loginWithGoogle = async () => {
  await singInWithGoogle().then(() => {
    if (auth.currentUser) {
      getDocs(query(collection(db, "Users"), where("uid", "==", auth.currentUser.uid))).then((data) => {
        if (data.empty && auth.currentUser) {
          addDoc(collection(db, "Users"), {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
          });
        }
      });
    }
  });
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password).catch((e) => {
    if (e.code === "auth/invalid-email") {
      alert("Wrong email or password");
    }
  });
};

export const loginHandler = async (remember: boolean, type: string, email?: string, password?: string) => {
  if (type === "login") {
    if (remember && email && password) {
      await setPersistence(auth, browserLocalPersistence).then(async () => await loginWithEmailAndPassword(email, password));
    } else if (email && password) {
      await setPersistence(auth, browserSessionPersistence).then(
        async () => await loginWithEmailAndPassword(email, password)
      );
    }
  }
  if (type === "google") {
    if (remember) {
      await setPersistence(auth, browserLocalPersistence).then(async () => await loginWithGoogle());
    } else await setPersistence(auth, browserSessionPersistence).then(async () => await loginWithGoogle());
  }
};
