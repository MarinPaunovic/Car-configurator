import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../modules/auth/db";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  const onClick = () => {
    if (password === confirmPassword) {
      if (password.length > 6) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            addDoc(collection(db, "Users"), { email, name }).then(() => {
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              navigate("/login");
            });
          })
          .catch((e) => {
            if (e.code === "auth/email-already-in-use") {
              alert("User with that email adress already exsist");
            }
          });
      } else alert("Password must have at least 6 characters");
    } else alert("Passwords doesn't match ");
  };

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
      Already have account? Login <Link to="/login">here</Link>
      <button
        className="register__button"
        onClick={() => {
          onClick();
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
