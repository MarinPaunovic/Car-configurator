import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../logout/logout";

const NavbarComponent = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <img src={require("../../../images/prototypLogo.png")}></img>
      </div>
      <div className="navbar__rightSide">
        <Link className="navbar__configure" to="/configure">
          Configure a car
        </Link>
        <button className="navbar__dropdown" onClick={() => setToggle(!toggle)}>
          <div className="navbar__dropdownRectangle"></div>
          <div className="navbar__dropdownRectangleCopy"></div>
        </button>
      </div>
      <div className="navbar__slideMenu" style={toggle ? { left: "89.75%" } : { left: "100%" }}>
        <button>My saved configurations</button>
        <span className="navbar__slideMenu__separator"></span>
        <Logout />
      </div>
    </div>
  );
};

export default NavbarComponent;
