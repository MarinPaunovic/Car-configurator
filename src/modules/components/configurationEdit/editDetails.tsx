import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, savedConfigAtom } from "../../storage/carAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";

import ExteriorDetails from "./exterior/exteriorDetails";
import InteriorDetails from "./Interior/interiorDetails";

const EditDetails = () => {
  const carConfig = useRecoilValue(carCustomConfiguratorAtom);
  const setCurrentPage = useSetRecoilState(previewCurrentPageAtom);
  const currentConfigPage = useRecoilValue(configuratorAtom);
  const savedConfig = useRecoilValue(savedConfigAtom);
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
      {Object.keys(savedConfig).length !== 0 ? (
        <div className="editDetails__saved">saved config setup</div>
      ) : currentConfigPage === 3 ? (
        <div>summary page</div>
      ) : (
        carConfig && (
          <div className="editDetails__new">
            <InteriorDetails />
            <ExteriorDetails />
            {/* <SummaryDetails /> */}
          </div>
        )
      )}
    </div>
  );
};

export default EditDetails;
