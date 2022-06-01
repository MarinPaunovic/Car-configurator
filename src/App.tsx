import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "./modules/auth/db";
import { userAuthState, userAuthStatePersist } from "./modules/storage/userAtoms";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  const userAuth = useRecoilValue(userAuthState);
  const userAuthPersist = useRecoilValue(userAuthStatePersist);
  return (
    <Router>
      <Routes>
        {userAuth || userAuthPersist ? (
          <Route path="/" element={<Homepage />} />
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
