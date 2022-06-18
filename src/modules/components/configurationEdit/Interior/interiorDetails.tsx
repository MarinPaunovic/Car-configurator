import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, selectedCarAtom } from "../../../storage/carAtoms";
import { localEditAtom, localEditSelector, summaryAtom } from "../../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../../storage/pageAtoms";
import Pagination from "../../pagination/pagination";
import PopupInfo from "../../popupInfo/popupInfo";
import DoneButton from "../doneButton";
import ColorTitleComponent from "./colorTitleComponent";

const InteriorDetails = () => {
  const carConfig = useRecoilValue(carCustomConfiguratorAtom);
  const { seats } = useRecoilValue(selectedCarAtom);
  const currentPage = useRecoilValue(previewCurrentPageAtom);
  const [localEdit, setLocalEdit] = useRecoilState(localEditAtom);
  const [currentConfigPage, setCurrentConfigPage] = useRecoilState<number>(configuratorAtom);
  const editSelector = useRecoilValue(localEditSelector);
  const [currentConfigChoice, setCurrentConfigChoice] = useRecoilState(optionsCurrentConfigAtom);
  const summary = useSetRecoilState(summaryAtom);
  return (
    <>
      {carConfig && currentConfigPage && currentConfigPage === 2 && (
        <>
          <div className="editDetails__img">
            {!editSelector ? (
              <>
                {currentPage === 1 ? (
                  <img
                    src={require("../../../../images/" +
                      carConfig.carModel +
                      "/interior/seats/" +
                      carConfig.interior.seats +
                      ".png")}
                    style={{ width: "95%", height: "55%", marginLeft: "2.5%" }}
                  />
                ) : (
                  <img
                    src={require("../../../../images/" +
                      carConfig.carModel +
                      "/interior/dash/" +
                      carConfig.interior.seats +
                      ".png")}
                    style={{ width: "95%", height: "55%", marginLeft: "2.5%" }}
                  />
                )}
                <Pagination pagesNumber={2} />
              </>
            ) : (
              <>
                {currentPage === 1 ? (
                  <img
                    src={require("../../../../images/" +
                      carConfig.carModel +
                      "/interior/seats/" +
                      editSelector.value +
                      ".png")}
                    style={{ width: "95%", height: "55%", marginLeft: "2.5%" }}
                  />
                ) : (
                  <img
                    src={require("../../../../images/" +
                      carConfig.carModel +
                      "/interior/dash/" +
                      editSelector.value +
                      ".png")}
                    style={{ width: "95%", height: "55%", marginLeft: "2.5%" }}
                  />
                )}
                <Pagination pagesNumber={2} />
              </>
            )}
          </div>

          {currentConfigChoice ? (
            <div className="editDetails__choice__second">
              <div className="editDetails__choice__second__wrapper">
                {currentConfigChoice === "seats" &&
                  seats.map((item: string, i: number) => (
                    <div className="editDetails__choice__second__wrapper__color" key={i}>
                      <div onClick={() => setLocalEdit({ value: item, edit: "seats" })}>
                        <div className="editDetails__choice__second__wrapper__color__mark">
                          <img
                            src={require("../../../../images/short_seats/" + item + ".png")}
                            style={{ blockSize: "70px", borderRadius: "100%" }}
                          />
                          {!localEdit.value
                            ? carConfig &&
                              item === carConfig.interior.seats && (
                                <div className="editDetails__choice__second__wrapper__chosen">
                                  <span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
                                    done
                                  </span>
                                </div>
                              )
                            : item === localEdit.value && (
                                <div className="editDetails__choice__second__wrapper__chosen">
                                  <span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
                                    done
                                  </span>
                                </div>
                              )}
                        </div>
                      </div>
                      <ColorTitleComponent color={item} />
                    </div>
                  ))}
              </div>
              <DoneButton />
            </div>
          ) : (
            <div className="editDetails__choice">
              <div className="editDetails__choice__items">
                <div
                  title="seats"
                  className="editDetails__choice__wrapper"
                  onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
                >
                  <img
                    src={require("../../../../images/short_seats/" + carConfig.interior.seats + ".png")}
                    style={{ blockSize: "70px", borderRadius: "100%" }}
                  />
                  <span>
                    <div className="editDetails__choice__wrapper__title">
                      <ColorTitleComponent color={carConfig.interior.seats} />
                    </div>
                    <p className="editDetails__choice__wrapper__sub">color</p>
                  </span>
                </div>
              </div>
              <div>
                <div className="editDetails__choice__popup__wrapper">
                  <PopupInfo text={"text info unutar edita"} className="editDetails__choice__popup" />
                  <span className="editDetails__choice__popup__price">120000€</span>
                </div>
                <button
                  className="editDetails__choice__button"
                  onClick={() => {
                    setCurrentConfigPage(currentConfigPage + 1);
                    summary(true);
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    Summary
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

export default InteriorDetails;
