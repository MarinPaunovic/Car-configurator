import { useRecoilValue } from "recoil";
import { carDefaultConfiguratorSelector, selectedCarAtom } from "../../storage/carAtoms";

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
          <div>
            total{" "}
            <span className="material-symbols-outlined" style={{ fontSize: "15px", fontVariationSettings: "1" }}>
              info
            </span>
          </div>
          <div>{120000}€</div>
        </div>
      </div>
      {carConfig && (
        <div className="configurationDetails__details">
          <div className="configurationDetails__details__title">Your configuration details</div>
          <div className="configurationDetails__details__wrapper">
            <div className="configurationDetails__details__exterior">
              <span className="configurationDetails__details__exterior__title">Exterior</span>
              <div className="configurationDetails__details__exterior__color">
                <img src={require("../../../images/" + carConfig.exterior.color + ".png")} />{" "}
                <div className="configurationDetails__details__text">
                  <p>{carConfig.exterior.color}</p>
                  <p>0€</p>
                </div>
              </div>
              <div className="configurationDetails__details__exterior__wheels">
                <img src={require("../../../images/" + carConfig.exterior.wheels + ".png")} />

                <div className="configurationDetails__details__text">
                  <p>{carConfig.exterior.wheels}</p>
                  <p>0€</p>
                </div>
              </div>
            </div>
            <div className="configurationDetails__details__interior">
              <span className="configurationDetails__details__exterior__title">Interior</span>
              <div className="configurationDetails__details__exterior__color">
                <img
                  src={require("../../../images/" + carConfig.interior.dash + ".png")}
                  style={{ blockSize: "50px", borderRadius: "20px" }}
                />
                <div className="configurationDetails__details__text">
                  <p>{carConfig.interior.dash}</p>
                  <p>0€</p>
                </div>
              </div>
              <div className="configurationDetails__details__exterior__wheels">
                <img
                  src={require("../../../images/" + carConfig.interior.seats + ".png")}
                  style={{ borderRadius: "100%" }}
                />
                <div className="configurationDetails__details__text">
                  <p>{carConfig.interior.seats}</p>
                  <p>0€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigurationDetails;
