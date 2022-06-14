import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, selectedCarAtom } from "../../../storage/carAtoms";
import { getTitleAtom, localEditAtom, localEditSelector } from "../../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../../storage/pageAtoms";
import Pagination from "../../pagination/pagination";
import EditChoiceComponent from "./editChoiceComponent";
import EditChoiceSecondComponent from "./editChoiceSecondComponent";

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
                      src={require("../../../../images/" +
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
                      src={require("../../../../images/" +
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
                src={require("../../../../images/" +
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
          {currentConfigChoice ? <EditChoiceSecondComponent /> : <EditChoiceComponent />}
        </>
      )}
    </>
  );
};

export default ExteriorDetails;
