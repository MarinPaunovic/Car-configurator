import { useRecoilState, useRecoilValue } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, savedConfigAtom, selectedCarAtom } from "../../storage/carAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";
import PopupInfo from "../popupInfo/popupInfo";

const InteriorDetails = () => {
  const [carConfig, setCarConfig] = useRecoilState(carCustomConfiguratorAtom);
  const { carModel, color, seats, dash, wheels } = useRecoilValue(selectedCarAtom);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const [currentConfigPage, setCurrentConfigPage] = useRecoilState<number>(configuratorAtom);
  const [savedConfig, setSavedConfig] = useRecoilState(savedConfigAtom);
  const [currentConfigChoice, setCurrentConfigChoice] = useRecoilState(optionsCurrentConfigAtom);
  return (
    <>
      {carConfig && currentConfigPage && currentConfigPage === 2 && (
        <>
          <div className="editDetails__img">seats</div>

          {currentConfigChoice ? (
            <div className="editDetails__choice__second">biraš {currentConfigChoice}</div>
          ) : (
            <div className="editDetails__choice">
              <div className="editDetails__choice__items">
                <div
                  title="seats"
                  className="editDetails__choice__wrapper"
                  onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
                >
                  <img
                    src={require("../../../images/" + carConfig.interior.seats + ".png")}
                    style={{ blockSize: "60px", borderRadius: "100%" }}
                  />
                  <span>
                    <p className="editDetails__choice__wrapper__title">seats</p>
                    <p className="editDetails__choice__wrapper__sub">paint color</p>
                  </span>
                </div>
                <div
                  title="dash"
                  className="editDetails__choice__wrapper"
                  onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
                >
                  <img
                    src={require("../../../images/" + carConfig.interior.dash + ".png")}
                    style={{ blockSize: "60px", borderRadius: "100%" }}
                  />
                  <span>
                    <p className="editDetails__choice__wrapper__title">dash</p>
                    <p className="editDetails__choice__wrapper__sub">paint color</p>
                  </span>
                </div>
              </div>
              <div className="editDetails__choice__popup__wrapper">
                <PopupInfo text={"text info unutar edita"} className="editDetails__choice__popup" />
                <span className="editDetails__choice__popup__price">120000€</span>
              </div>
              <button className="editDetails__choice__button" onClick={() => setCurrentConfigPage(currentConfigPage + 1)}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  Interior{" "}
                  <span className="material-symbols-outlined" style={{ color: "#FCFCFD", fontSize: "16px" }}>
                    keyboard_arrow_right
                  </span>
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InteriorDetails;
