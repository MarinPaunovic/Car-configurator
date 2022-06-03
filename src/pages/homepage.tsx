import Configurator from "../modules/components/homepage/configurator";
import NavbarComponent from "../modules/components/navbar/navbarComponent";

const Homepage = () => {
  return (
    <div className="homepage">
      <NavbarComponent />
      <Configurator />
    </div>
  );
};

export default Homepage;
