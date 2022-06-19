import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, selectedCarAtom } from "../../../storage/carAtoms";
import { getTitleAtom, localEditAtom } from "../../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../../storage/optionsAtom";
import CheckMarkComponent from "../checkMarkComponent";
import DoneButton from "../doneButton";

const EditChoiceSecondComponent = () => {
  const { wheels, color } = useRecoilValue(selectedCarAtom);
  const [localEdit, setLocalEdit] = useRecoilState(localEditAtom);
  const carConfig = useRecoilValue(carCustomConfiguratorAtom);
  const title = useRecoilValue(getTitleAtom);
  const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom);
  const currentConfigChoice = useRecoilValue(optionsCurrentConfigAtom);
  return (
    <div className="editDetails__choice__second">
      <div className="editDetails__choice__second__wrapper">
        {currentConfigChoice && currentConfigChoice === "wheels" ? (
          <>
            <div className="editDetails__choice__smallScreen__title">
              {title}
              <span
                className="material-symbols-outlined editDetails__choice__smallScreen__title__x"
                onClick={() => {
                  setCurrentConfigChoice("");
                  setLocalEdit({ value: "", edit: "" });
                }}
              >
                x
              </span>
            </div>
            {wheels &&
              wheels.map((item: string, i: number) => (
                <div
                  className="editDetails__choice__second__wrapper__each"
                  key={i}
                  onClick={() => {
                    setLocalEdit({ value: item, edit: "wheels" });
                  }}
                >
                  <div className="editDetails__choice__second__wrapper__color">
                    <div className="editDetails__choice__second__wrapper__color__mark">
                      {carConfig && (
                        <img
                          src={require("../../../../images/" + carConfig.carModel + "/exterior/wheels/" + item + ".png")}
                          style={{ blockSize: "60px" }}
                        />
                      )}
                      {localEdit.value
                        ? item === localEdit.value && <CheckMarkComponent />
                        : carConfig && item === carConfig.exterior.wheels && <CheckMarkComponent />}
                    </div>

                    <div className="editDetails__choice__second__wrapper__color__title_wrapper">
                      {item === "one" ? <div>22” Magnesium 5-spoke</div> : <div>22” Alloy 10-spoke</div>}
                      <>
                        {!localEdit.edit
                          ? carConfig &&
                            item === carConfig.exterior.wheels && (
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
          </>
        ) : (
          <>
            <div className="editDetails__choice__smallScreen__title">
              {title}
              <span
                className="material-symbols-outlined editDetails__choice__smallScreen__title__x"
                onClick={() => {
                  setCurrentConfigChoice("");
                  setLocalEdit({ value: "", edit: "" });
                }}
              >
                x
              </span>
            </div>
            {color.map((item: string, i: number) => (
              <>
                <div
                  className="editDetails__choice__second__wrapper__each"
                  key={i}
                  onClick={() => {
                    setLocalEdit({ value: item, edit: "color" });
                  }}
                >
                  <div className="editDetails__choice__second__wrapper__color">
                    <div className="editDetails__choice__second__wrapper__color__mark">
                      <img
                        src={require("../../../../images/colors/" + item + ".png")}
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
                        : carConfig &&
                          item === carConfig.exterior.color && (
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
                          ? carConfig &&
                            item === carConfig.exterior.color && (
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
              </>
            ))}
          </>
        )}
        <DoneButton />
      </div>
    </div>
  );
};

export default EditChoiceSecondComponent;
