import { useRecoilValue } from "recoil";
import { selectedCarAtom } from "../../../storage/carAtoms";
import CarPhotoSlider from "../../configurationView/carPhotoSlider";
import ConfigurationDetails from "../../configurationView/configurationDetails";
import PopupInfo from "../../popupInfo/popupInfo";

const SummaryDetails = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
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
        <button className="summary__button"> Save your configuration </button>
      </div>
    </div>
  );
};
export default SummaryDetails;
