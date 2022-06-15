import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, savedConfigAtom, selectedCarAtom } from "../../storage/carAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";

import ExteriorDetails from "./exterior/exteriorDetails";
import InteriorDetails from "./Interior/interiorDetails";
import SummaryDetails from "./summary/summaryDetails";

const EditDetails = () => {
  const carConfig = useRecoilValue(carCustomConfiguratorAtom);
  const setCurrentPage = useSetRecoilState(previewCurrentPageAtom);
  const currentConfigPage = useRecoilValue(configuratorAtom);
  const savedConfig = useRecoilValue(savedConfigAtom);
  const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom);
  const resetSelectedCar = useSetRecoilState(selectedCarAtom);
  let isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return () => {
      setCurrentPage(1);
      setCurrentConfigChoice("");
    };
  }, []);

  return (
    <div className="editDetails">
      {Object.keys(savedConfig).length !== 0 ? (
        <div className="editDetails__saved">saved config setup</div>
      ) : currentConfigPage === 3 ? (
        <SummaryDetails />
      ) : (
        carConfig && (
          <div className="editDetails__new">
            <InteriorDetails />
            <ExteriorDetails />
          </div>
        )
      )}
    </div>
  );
};

export default EditDetails;
