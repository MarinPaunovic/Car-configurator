import { useState } from "react";
import { Link } from "react-router-dom";
import RememberMe from "../rememeberMe/rememberMe";
import { onClick } from "./registerFunctions";

const RegisterInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="login">
      <div className="login__background"></div>
      <label className="login__label">Register Page</label>
      <div className="login__inputBox__wrapper">
        <div className="login__test">
          <div>
            <img
              src={require("../../../images/loginImg.png")}
              style={{
                blockSize: "100px",
                paddingInline: "20px",
                opacity: "0.90",
                marginTop: "125px",
                marginBottom: "30px",
              }}
            ></img>
          </div>
          Car configurator
        </div>
        <div className="login__inputBox">
          <input
            className="register__name"
            type={"text"}
            placeholder={"Name"}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            className="register__email"
            type={"text"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="register__password"
            type={"password"}
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            className="register__confirmPassword"
            type={"password"}
            placeholder={"Confirm Password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <RememberMe remember={remember} setRemember={setRemember} />
          <div className="login__buttons">
            <button
              className="login__buttons__loginButton"
              onClick={async () => {
                await onClick(name, email, password, confirmPassword, remember);
              }}
            >
              Register
            </button>
          </div>
          <div className="login__menu">
            <div className="login__menu__register">
              Already have account? Login <Link to="/login">here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInput;
