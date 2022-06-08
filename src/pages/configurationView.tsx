import Options from "../modules/components/configurationView/options";
import NavbarComponent from "../modules/components/navbar/navbarComponent";
import CarPhotoSlider from "../modules/components/configurationView/carPhotoSlider";
import ConfigurationDetails from "../modules/components/configurationView/configurationDetails";

const ConfigurationView = () => {
  return (
    <div className="configurationView">
      <NavbarComponent />
      <Options />
      <CarPhotoSlider />
      <ConfigurationDetails />
    </div>
  );
};

export default ConfigurationView;
