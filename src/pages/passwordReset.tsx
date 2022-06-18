import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../modules/auth/db";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  return (
    <div>
      <label>Password Reset</label>
      <input type={"text"} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <button
        onClick={() => {
          sendPasswordResetEmail(auth, email).then(() => {
            alert("Password reset sent!");
            setEmail("");
            navigate("/login");
          });
        }}
      >
        Send
      </button>
    </div>
  );
};

export default PasswordReset;
