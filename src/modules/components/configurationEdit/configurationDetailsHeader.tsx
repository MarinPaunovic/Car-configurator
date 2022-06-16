import { useRecoilValue } from "recoil";
import { selectedCarAtom } from "../../storage/carAtoms";
import PopupInfo from "../popupInfo/popupInfo";

const ConfigurationDetailsHeader = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
  return (
    <div className="configurationDetails__header">
      <div className="configurationDetails__header__info">
        <div className="configurationDetails__header__info__carModel">{carModel}</div>
        <div className="configurationDetails__header__info__year">{year}</div>
      </div>
      <div className="configurationDetails__header__price">
        <PopupInfo text="popup informacije" className="configurationDetails__header__price__popup" />
        <div className="configurationDetails__header__amount">120000€</div>
      </div>
    </div>
  );
};

export default ConfigurationDetailsHeader;
