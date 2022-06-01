import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth } from "../../auth/db";
import { userAuthState, userAuthStatePersist } from "../../storage/userAtoms";

const Logout = () => {
  let navigate = useNavigate();
  const uAuth = useSetRecoilState(userAuthState);
  const uAuthPersist = useSetRecoilState(userAuthStatePersist);
  return (
    <div>
      <button
        onClick={() => {
          signOut(auth);
          uAuth(false);
          uAuthPersist(false);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
