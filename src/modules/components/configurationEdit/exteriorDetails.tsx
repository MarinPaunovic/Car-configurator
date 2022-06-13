import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, ICar, savedConfigAtom, selectedCarAtom } from "../../storage/carAtoms";
import { getTitleAtom, localEditAtom, localEditSelector } from "../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";
import Pagination from "../pagination/pagination";
import PopupInfo from "../popupInfo/popupInfo";
import DoneButton from "./doneButton";

const ExteriorDetails = () => {
  const [carConfig, setCarConfig] = useRecoilState(carCustomConfiguratorAtom);
  const { carModel, color, wheels } = useRecoilValue(selectedCarAtom);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const [currentConfigPage, setCurrentConfigPage] = useRecoilState(configuratorAtom);
  const [currentConfigChoice, setCurrentConfigChoice] = useRecoilState(optionsCurrentConfigAtom);
  const setChoiceTitle = useSetRecoilState(getTitleAtom);
  const [localEdit, setLocalEdit] = useRecoilState(localEditAtom);
  const editSelector = useRecoilValue(localEditSelector);
  useEffect(() => {
    if (currentConfigChoice) {
      getTitle();
    }
  }, [currentConfigChoice]);

  const getTitle = () => {
    switch (currentConfigChoice) {
      case "color":
        setChoiceTitle("Paint color");
        return;
      case "wheels":
        setChoiceTitle("Wheels");
        return;
    }
  };

  return (
    <>
      {currentConfigPage && currentConfigPage === 1 && carConfig && (
        <>
          <div className="editDetails__img">
            {localEdit.edit && localEdit.edit.length !== 0 ? (
              localEdit.edit === "color" ? (
                <>
                  {editSelector && (
                    <img
                      src={require("../../../images/" +
                        carModel +
                        "_" +
                        editSelector.value +
                        "_" +
                        carConfig.exterior.wheels +
                        "_preview/" +
                        currentPage +
                        ".png")}
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              ) : (
                <>
                  {editSelector && (
                    <img
                      src={require("../../../images/" +
                        carModel +
                        "_" +
                        carConfig.exterior.color +
                        "_" +
                        editSelector.value +
                        "_preview/" +
                        currentPage +
                        ".png")}
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )
            ) : (
              <img
                src={require("../../../images/" +
                  carModel +
                  "_" +
                  carConfig.exterior.color +
                  "_" +
                  carConfig.exterior.wheels +
                  "_preview/" +
                  currentPage +
                  ".png")}
                style={{ width: "100%" }}
              />
            )}
            <Pagination pagesNumber={5} />
          </div>
          {currentConfigChoice ? (
            currentConfigChoice === "color" ? (
              <div className="editDetails__choice__second">
                <div className="editDetails__choice__second__wrapper">
                  {color.map((item: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        setLocalEdit({ value: item, edit: "color" });
                      }}
                    >
                      <div className="editDetails__choice__second__wrapper__color">
                        <div className="editDetails__choice__second__wrapper__color__mark">
                          <img
                            src={require("../../../images/" + item + ".png")}
                            style={{ blockSize: "60px", borderRadius: "100%" }}
                          />
                          {localEdit.value
                            ? item === localEdit.value && (
                                <div className="editDetails__choice__second__wrapper__chosen">
                                  <span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
                                    done
                                  </span>
                                </div>
                              )
                            : item === carConfig.exterior.color && (
                                <div className="editDetails__choice__second__wrapper__chosen">
                                  <span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
                                    done
                                  </span>
                                </div>
                              )}
                        </div>
                        <div className="editDetails__choice__second__wrapper__color__title_wrapper">
                          <span>{item}</span>
                          <>
                            {!localEdit.edit
                              ? item === carConfig.exterior.color && (
                                  <div className="editDetails__choice__second__wrapper__color__title__wrapper__price">
                                    2,500€
                                  </div>
                                )
                              : item === localEdit.value && (
                                  <div className="editDetails__choice__second__wrapper__color__title__wrapper__price">
                                    2,500€
                                  </div>
                                )}
                          </>
                        </div>
                      </div>
                    </div>
                  ))}
                  <DoneButton />
                </div>
              </div>
            ) : (
              <div className="editDetails__choice__second">
                <div className="editDetails__choice__second__wrapper">
                  {wheels &&
                    wheels.map((item: string, i: number) => (
                      <div
                        key={i}
                        onClick={() => {
                          setLocalEdit({ value: item, edit: "wheels" });
                        }}
                      >
                        <div className="editDetails__choice__second__wrapper__color">
                          <div className="editDetails__choice__second__wrapper__color__mark">
                            <img src={require("../../../images/" + item + ".png")} style={{ blockSize: "60px" }} />
                            {localEdit.value
                              ? item === localEdit.value && (
                                  <div className="editDetails__choice__second__wrapper__chosen">
                                    <span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
                                      done
                                    </span>
                                  </div>
                                )
                              : item === carConfig.exterior.wheels && (
                                  <div className="editDetails__choice__second__wrapper__chosen">
                                    <span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
                                      done
                                    </span>
                                  </div>
                                )}
                          </div>

                          <div className="editDetails__choice__second__wrapper__color__title_wrapper">
                            {item === "one" ? <div>22” Magnesium 5-spoke</div> : <div>22” Alloy 10-spoke</div>}
                            <>
                              {!localEdit.edit
                                ? item === carConfig.exterior.wheels && (
                                    <div className="editDetails__choice__second__wrapper__color__title__wrapper__price">
                                      2,500€
                                    </div>
                                  )
                                : item === localEdit.value && (
                                    <div className="editDetails__choice__second__wrapper__color__title__wrapper__price">
                                      2,500€
                                    </div>
                                  )}
                            </>
                          </div>
                        </div>
                      </div>
                    ))}
                  <DoneButton />
                </div>
              </div>
            )
          ) : (
            <div className="editDetails__choice">
              <div className="editDetails__choice__items">
                <div
                  className="editDetails__choice__wrapper"
                  title="color"
                  onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
                >
                  <img
                    src={require("../../../images/" + carConfig.exterior.color + ".png")}
                    style={{ blockSize: "60px", borderRadius: "100%" }}
                  />
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
                  <img
                    src={require("../../../images/" + carConfig.exterior.wheels + ".png")}
                    style={{ blockSize: "60px" }}
                  />
                  <span>
                    <p className="editDetails__choice__wrapper__title">
                      {carConfig.exterior.wheels === "one" ? "22˝ Magnesium 5-spoke" : "22˝ Alloy 10-spoke"}
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

// setCarConfig((prevState) => {
//   if (!prevState) {
//     return undefined;
//   }
//   return {
//     ...prevState,
//     exterior: { color: prevState.exterior.color, wheels: item },
//   };
// });
