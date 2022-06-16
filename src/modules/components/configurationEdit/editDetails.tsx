import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom } from "../../storage/carAtoms";
import { savedConfigEditAtom } from "../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";

import ExteriorDetails from "./exterior/exteriorDetails";
import InteriorDetails from "./Interior/interiorDetails";
import SummaryDetails from "./summary/summaryDetails";

const EditDetails = () => {
  const carConfig = useRecoilValue(carCustomConfiguratorAtom);
  const setCurrentPage = useSetRecoilState(previewCurrentPageAtom);
  const currentConfigPage = useRecoilValue(configuratorAtom);
  const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom);
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
      {currentConfigPage === 3 ? (
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
