import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../modules/auth/db";
import Navbar from "../modules/components/navbar/navbar";
import { userAtom } from "../modules/storage/userAtoms";

const Homepage = () => {
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    addDoc(collection(db, "Users"), { name: "test", username: "forte" });
  }, []);
  return (
    <div className="homepage">
      <Navbar />
      <div>Welcome {user.name}</div>
      <div className="homepage__centerPageDiv">
        <img className="homepage_carImage" src={require("../images/front-left-2.png")} />
        <div className="homepage__emptyMessage">
          You haven't configured any cars yet. You may choose to <Link to="/configure">configure some now.</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
