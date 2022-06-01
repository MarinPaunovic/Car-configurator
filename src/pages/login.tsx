import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth, db, singInWithGoogle } from "../modules/auth/db";
import { userAuthState, userAuthStatePersist } from "../modules/storage/userAtoms";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const setAuthPersist = useSetRecoilState(userAuthStatePersist);
  const setAuth = useSetRecoilState(userAuthState);

  let navigate = useNavigate();

  const loginWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/");
        if (remember) {
          setAuthPersist(true);
        } else {
          setAuth(true);
        }
      })
      .catch((e) => {
        if (e.code === "auth/invalid-email") {
          alert("Wrong email or password");
        }
      });
  };
  const loginWithGoogle = () => {
    singInWithGoogle().then(() => {
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
        navigate("/");
        if (remember) {
          setAuthPersist(true);
        } else {
          setAuth(true);
        }
      }
    });
  };

  return (
    <div className="login">
      <input type={"text"} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
      <input type={"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
      Dont have account yet? Create one <Link to="/register">here</Link>
      Remember me<input type={"checkbox"} onChange={() => setRemember(!remember)}></input>
      <button className="login__button" onClick={() => loginWithEmailAndPassword()}>
        Login
      </button>
      <button
        onClick={() => {
          loginWithGoogle();
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
