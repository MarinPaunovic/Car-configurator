import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth, db } from "../../../auth/db";
import { CarConfig, carCustomConfiguratorAtom, ICar, selectedCarAtom } from "../../../storage/carAtoms";
import CarPhotoSlider from "../../configurationView/carPhotoSlider";
import ConfigurationDetails from "../../configurationView/configurationDetails";
import PopupInfo from "../../popupInfo/popupInfo";

const SummaryDetails = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
  const carConfig = useRecoilValue<CarConfig>(carCustomConfiguratorAtom);

  const saveConfig = () => {
    if (auth.currentUser) {
      addDoc(collection(db, "SavedConfigurations"), {
        uid: auth.currentUser.uid,
        productionYear: year,
        carModel: carConfig.carModel,
        exterior: { color: carConfig.exterior.color, wheels: carConfig.exterior.wheels },
        interior: { seats: carConfig.interior.seats, dash: carConfig.interior.dash },
        createdAt: serverTimestamp(),
      });
    }
  };

  return (
    <div className="configurationView">
      <CarPhotoSlider />
      <ConfigurationDetails />
      <div className="summary__wrapper">
        <div className="summary__left">
          <div className="options__left">
            <p className="options__left__year">{year}</p>
            <p className="options__left__carModel">{carModel}</p>
          </div>
          <div className="summary__left__infos">
            <PopupInfo text={"Summary popup info"} className={"summary__popup"} />
            <p className="configurationDetails__header__amount">120,000.12€</p>
          </div>
        </div>
        <Link className="summary__button" onClick={() => saveConfig()} to="/">
          Save your configuration
        </Link>
      </div>
    </div>
  );
};
export default SummaryDetails;
