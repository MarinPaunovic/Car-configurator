import { signOut } from "firebase/auth";
import { auth } from "../../auth/db";

const Logout = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
