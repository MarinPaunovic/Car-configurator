import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, selectedCarAtom } from "../../../storage/carAtoms";
import { getTitleAtom, localEditAtom, localEditSelector } from "../../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../../storage/pageAtoms";
import Pagination from "../../pagination/pagination";
import EditChoiceComponent from "./editChoiceComponent";
import EditChoiceSecondComponent from "./editChoiceSecondComponent";

const ExteriorDetails = () => {
  const carConfig = useRecoilValue(carCustomConfiguratorAtom);
  const { carModel } = useRecoilValue(selectedCarAtom);
  const currentPage = useRecoilValue(previewCurrentPageAtom);
  const currentConfigPage = useRecoilValue(configuratorAtom);
  const currentConfigChoice = useRecoilValue(optionsCurrentConfigAtom);
  const setChoiceTitle = useSetRecoilState(getTitleAtom);
  const localEdit = useRecoilValue(localEditAtom);
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
      case "dash":
        setChoiceTitle("Dash color");
        return;
      case "seats":
        setChoiceTitle("Seats color");
        return;
      default:
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
                      src={require("../../../../images/" +
                        carModel +
                        "/exterior/" +
                        editSelector.value +
                        "/" +
                        carConfig.exterior.wheels +
                        "/" +
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
                      src={require("../../../../images/" +
                        carModel +
                        "/exterior/" +
                        carConfig.exterior.color +
                        "/" +
                        editSelector.value +
                        "/" +
                        currentPage +
                        ".png")}
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )
            ) : (
              <img
                src={require("../../../../images/" +
                  carModel +
                  "/exterior/" +
                  carConfig.exterior.color +
                  "/" +
                  carConfig.exterior.wheels +
                  "/" +
                  currentPage +
                  ".png")}
                style={{ width: "100%" }}
              />
            )}
            <Pagination pagesNumber={5} />
          </div>
          {currentConfigChoice ? <EditChoiceSecondComponent /> : <EditChoiceComponent />}
        </>
      )}
    </>
  );
};

export default ExteriorDetails;
