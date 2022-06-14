import { useRecoilValue } from "recoil";
import { carDefaultConfiguratorSelector, selectedCarAtom } from "../../storage/carAtoms";
import PopupInfo from "../popupInfo/popupInfo";

const ConfigurationDetails = () => {
  const { carModel, year } = useRecoilValue(selectedCarAtom);
  const carConfig = useRecoilValue(carDefaultConfiguratorSelector);

  return (
    <>
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
      {carConfig && (
        <div className="configurationDetails__details">
          <div className="configurationDetails__details__title">Your configuration details</div>
          <div className="configurationDetails__details__wrapper">
            <div className="configurationDetails__details__exterior">
              <span className="configurationDetails__details__exterior__title">Exterior</span>
              <div className="configurationDetails__details__exterior__color">
                <img
                  src={require("../../../images/colors/" + carConfig.exterior.color + ".png")}
                  style={{ blockSize: "60px", borderRadius: "100%" }}
                />
                <div className="configurationDetails__details__text">
                  <p>{carConfig.exterior.color}</p>
                  <p>0€</p>
                </div>
              </div>
              <div className="configurationDetails__details__exterior__wheels">
                <img
                  src={require("../../../images/" +
                    carConfig.carModel +
                    "/exterior/wheels/" +
                    carConfig.exterior.wheels +
                    ".png")}
                  style={{ blockSize: "60px" }}
                />

                <div className="configurationDetails__details__text">
                  <div>{carConfig.exterior.wheels === "one" ? <p>22” Magnesium 5-spoke</p> : <p>22” Alloy 10-spoke</p>}</div>
                  <p>0€</p>
                </div>
              </div>
            </div>
            <div className="configurationDetails__details__interior">
              <span className="configurationDetails__details__exterior__title">Interior</span>
              <div className="configurationDetails__details__exterior__wheels">
                <img
                  src={require("../../../images/short_seats/" + carConfig.interior.seats + ".png")}
                  style={{ borderRadius: "100%", blockSize: "60px" }}
                />
                <div className="configurationDetails__details__text">
                  <p>{carConfig.interior.seats}</p>
                  <p>0€</p>
                </div>
              </div>
            </div>
            <div className="configurationDetails__details__total">
              <span className="configurationDetails__details__total__total">Total</span>
              <span className="configurationDetails__details__total__amount">120000€</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigurationDetails;
