import { browserLocalPersistence, browserSessionPersistence, setPersistence } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth } from "../../auth/db";
import { userAuthPersistState } from "../../storage/userAtoms";
import { loginWithEmailAndPassword, loginWithGoogle } from "./loginFunctions";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const rememberAtom = useSetRecoilState(userAuthPersistState);

  let navigate = useNavigate();
  return (
    <div className="login">
      <input type={"text"} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
      <input type={"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
      Dont have account yet? Create one <Link to="/register">here</Link>
      Remember me
      <input type={"checkbox"} onChange={() => setRemember(!remember)}></input>
      <button
        className="login__button"
        onClick={async () => {
          let approved = await loginWithEmailAndPassword(email, password);
          if (approved) {
            if (remember) {
              setPersistence(auth, browserLocalPersistence);
            } else {
              setPersistence(auth, browserSessionPersistence);
            }
          }
        }}
      >
        Login
      </button>
      <button
        onClick={async () => {
          let approved = await loginWithGoogle();
          if (approved) {
            if (remember) {
              setPersistence(auth, browserLocalPersistence);
            } else {
              setPersistence(auth, browserSessionPersistence);
            }
          }
        }}
      >
        Login with Google
      </button>
    </div>
  );
};
export default LoginComponent;
