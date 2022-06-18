import { useRecoilValue } from "recoil";
import LoginComponent from "../modules/components/login/login";
import { savedConfigAtom } from "../modules/storage/carAtoms";
import { userAtom } from "../modules/storage/userAtoms";

const Login = () => {
  const savedConfig = useRecoilValue(userAtom);
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;
