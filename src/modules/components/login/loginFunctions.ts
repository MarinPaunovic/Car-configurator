import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, singInWithGoogle } from "../../auth/db";

export const loginWithGoogle = async () => {
  let bool = false;
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
    bool = true;
  });
  return bool;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  let bool = false;
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      bool = true;
    })
    .catch((e) => {
      if (e.code === "auth/invalid-email") {
        alert("Wrong email or password");
      }
    });
  return bool;
};
