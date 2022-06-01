import { Link } from "react-router-dom";
import Logout from "../modules/components/logout/logout";
import Navbar from "../modules/components/navbar/navbar";
const Homepage = () => {
  return (
    <div className="homepage">
      <Navbar />
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
