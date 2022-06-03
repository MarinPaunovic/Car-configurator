import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "./modules/auth/db";
import { userAtom } from "./modules/storage/userAtoms";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import PasswordReset from "./pages/passwordReset";
import Register from "./pages/register";

const App = () => {
  console.log("app");
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const isMounted = useRef(false);
  console.log(auth.currentUser);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(auth.currentUser);
      console.log(1);
      if (user && !userInfo.email) {
        console.log(2);
        setUserInfo({ name: user.displayName, uid: user.uid, email: user.email });
      }
      if (!user) {
        console.log(3);
        setUserInfo({ name: "", email: "", uid: "" });
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {userInfo.email ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/passwordReset" element={<PasswordReset />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
