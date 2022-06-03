import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, singInWithGoogle } from "../../auth/db";

export const loginWithGoogle = async () => {
  await singInWithGoogle().then(() => {
    if (auth.currentUser) {
      getDocs(query(collection(db, "Users"), where("uid", "==", auth.currentUser.uid))).then((data) => {
        if (data.empty) {
          addDoc(collection(db, "Users"), {
            name: auth.currentUser?.displayName,
            email: auth.currentUser?.email,
            uid: auth.currentUser?.uid,
          });
        }
      });
    }
  });
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password).catch((e) => {
    if (e.code === "auth/invalid-email") {
      alert("Wrong email or password");
    }
  });
};
