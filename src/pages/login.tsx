import { useRecoilValue } from "recoil";
import LoginComponent from "../modules/components/login/login";
import { savedConfigAtom } from "../modules/storage/carAtoms";
import { userAtom } from "../modules/storage/userAtoms";

const Login = () => {
  const savedConfig = useRecoilValue(userAtom);
  console.log(savedConfig);
  return (
    <>
      <LoginComponent />
      <button onClick={() => console.log(savedConfig)}>click</button>
    </>
  );
};

export default Login;
