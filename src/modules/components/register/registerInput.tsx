import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RememberMe from "../rememeberMe/rememberMe";
import { onClick } from "./registerFunctions";

const RegisterInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);

  let navigate = useNavigate();

  return (
    <div
      className="register"
      style={{ display: "flex", flexDirection: "column", width: "150px", alignItems: "center", margin: "200px" }}
    >
      <input
        className="register__input__name register__input__name--active"
        type={"text"}
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        className="register__input__email register__input__email--active"
        type={"text"}
        placeholder={"E-mail"}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="register__input__password register__input__password--active"
        type={"password"}
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        className="register__input__confirmPassword register__input__confirmPassword--active"
        type={"password"}
        placeholder={"Confirm Password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></input>
      <div className="register__headToLogin">
        Already have account? Login <Link to="/login">here</Link>
      </div>
      <RememberMe />
      <button
        className="register__button"
        onClick={async () => {
          let approved = await onClick(name, email, password, confirmPassword, remember);
          if (approved) {
            navigate("/login");
          }
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterInput;
