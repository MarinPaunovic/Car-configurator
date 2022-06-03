import { FirebaseError } from "firebase/app";
import { browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail, setPersistence } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../auth/db";

import { loginWithEmailAndPassword, loginWithGoogle } from "./loginFunctions";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  let navigate = useNavigate();
  return (
    <div className="login">
      <input type={"text"} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
      <input type={"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
      Dont have account yet? Create one <Link to="/register">here</Link>I forgot my <Link to="/passwordReset">password</Link>
      Remember me
      <input type={"checkbox"} onChange={() => setRemember(!remember)}></input>
      <button
        className="login__button"
        onClick={async () => {
          if (remember) {
            await setPersistence(auth, browserLocalPersistence).then(
              async () => await loginWithEmailAndPassword(email, password)
            );
          } else
            await setPersistence(auth, browserSessionPersistence).then(
              async () => await loginWithEmailAndPassword(email, password)
            );
        }}
      >
        Login
      </button>
      <button
        onClick={async () => {
          if (remember) {
            await setPersistence(auth, browserLocalPersistence).then(async () => await loginWithGoogle());
          } else await setPersistence(auth, browserSessionPersistence).then(async () => await loginWithGoogle());
        }}
      >
        Login with Google
      </button>
    </div>
  );
};
export default LoginComponent;
