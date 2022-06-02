import {
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { auth } from "./modules/auth/db";
import { userAtom } from "./modules/storage/userAtoms";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    let unsub = onAuthStateChanged(auth, (user) => {
      if (user && !userInfo.email) {
        setUserInfo({ name: user.displayName, uid: user.uid, email: user.email });
      }
      if (!user) {
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
        {userInfo.name && userInfo.email && userInfo.uid ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
