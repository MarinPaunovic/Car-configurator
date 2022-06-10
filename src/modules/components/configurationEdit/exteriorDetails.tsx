import { useRecoilState, useRecoilValue } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, savedConfigAtom, selectedCarAtom } from "../../storage/carAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";
import Pagination from "../pagination/pagination";
import PopupInfo from "../popupInfo/popupInfo";

const ExteriorDetails = () => {
  const [carConfig, setCarConfig] = useRecoilState(carCustomConfiguratorAtom);
  const { carModel, color, wheels } = useRecoilValue(selectedCarAtom);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const [currentConfigPage, setCurrentConfigPage] = useRecoilState(configuratorAtom);
  const [currentConfigChoice, setCurrentConfigChoice] = useRecoilState(optionsCurrentConfigAtom);
  console.log(carConfig);

  return (
    <>
      {currentConfigPage && currentConfigPage === 1 && carConfig && (
        <>
          <div className="editDetails__img">
            <img
              src={require("../../../images/" +
                carModel +
                "_" +
                carConfig.exterior.color +
                "_preview/" +
                currentPage +
                ".png")}
              style={{ width: "100%" }}
            />
            <Pagination pagesNumber={5} />
          </div>
          {currentConfigChoice ? (
            <div className="editDetails__choice__second">
              biraš {currentConfigChoice}
              <div>
                {color.map((item: any, i: number) => (
                  <div key={i}>{item}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="editDetails__choice">
              <div className="editDetails__choice__items">
                <div
                  className="editDetails__choice__wrapper"
                  title="color"
                  onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
                >
                  <img src={require("../../../images/" + carConfig.exterior.color + ".png")} />
                  <span>
                    <p className="editDetails__choice__wrapper__title">{carConfig.exterior.color}</p>
                    <p className="editDetails__choice__wrapper__sub">PAINT COLOR</p>
                  </span>
                </div>
                <div
                  title="wheels"
                  className="editDetails__choice__wrapper"
                  onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
                >
                  <img src={require("../../../images/" + carConfig.exterior.wheels + ".png")} />
                  <span>
                    <p className="editDetails__choice__wrapper__title">
                      {carConfig.exterior.wheels === "one" ? "22˝ Magnesium 5-spoke" : "other"}
                    </p>
                    <p className="editDetails__choice__wrapper__sub">wheels</p>
                  </span>
                </div>
              </div>
              <div>
                <div className="editDetails__choice__popup__wrapper">
                  <PopupInfo text={"text info unutar edita"} className="editDetails__choice__popup" />
                  <span className="editDetails__choice__popup__price">120000€</span>
                </div>
                <button className="editDetails__choice__button" onClick={() => setCurrentConfigPage(currentConfigPage + 1)}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    Interior
                    <span className="material-symbols-outlined" style={{ color: "#FCFCFD", fontSize: "16px" }}>
                      keyboard_arrow_right
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExteriorDetails;
