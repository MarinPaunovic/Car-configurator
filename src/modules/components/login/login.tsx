import { useState } from "react";
import { Link } from "react-router-dom";

import { loginHandler } from "./loginFunctions";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
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
          await loginHandler(remember, "login", email, password);
        }}
      >
        Login
      </button>
      <button
        onClick={async () => {
          await loginHandler(remember, "google");
        }}
      >
        Login with Google
      </button>
    </div>
  );
};
export default LoginComponent;
