import { useState } from "react";
import { Link } from "react-router-dom";
import RememberMe from "../rememeberMe/rememberMe";

import { loginHandler } from "./loginFunctions";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  return (
    <div className="login">
      <div className="login__wrapper">
        <label className="login__label">Login Page</label>
        <div className="login__inputBox__wrapper">
          <div className="login__test">
            <div>
              <img className="login__img" src={require("../../../images/loginImg.png")}></img>
            </div>
            Car configurator
          </div>
          <div className="login__inputBox">
            <input
              className="login__email"
              type={"text"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="login__password"
              type={"password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <RememberMe remember={remember} setRemember={setRemember} />
            <div className="login__buttons">
              <button
                className="login__buttons__loginButton"
                onClick={async () => {
                  await loginHandler(remember, "login", email, password);
                }}
              >
                Login
              </button>
              <button
                className="login__buttons__googleButton"
                onClick={async () => {
                  await loginHandler(remember, "google");
                }}
              >
                Login with Google
              </button>
            </div>
            <div className="login__menu">
              <div className="login__menu__register">
                Dont have account yet? Create one <Link to="/register">here</Link>
              </div>
              <div className="login__menu__passwordReset">
                I forgot my <Link to="/password-reset">password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
