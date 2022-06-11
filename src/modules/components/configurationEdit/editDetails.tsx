import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { brotliDecompress } from "zlib";
import { db } from "../../auth/db";
import {
  carCustomConfiguratorAtom,
  carsAtom,
  configuratorAtom,
  savedConfigAtom,
  selectedCarAtom,
} from "../../storage/carAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";
import Pagination from "../pagination/pagination";
import PopupInfo from "../popupInfo/popupInfo";
import ExteriorDetails from "./exteriorDetails";
import InteriorDetails from "./interiorDetails";
import SummaryDetails from "./summaryDetails";

const EditDetails = () => {
  const [carConfig, setCarConfig] = useRecoilState(carCustomConfiguratorAtom);
  const { carModel, color, seats, dash, wheels } = useRecoilValue(selectedCarAtom);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const [currentConfigPage, setCurrentConfigPage] = useRecoilState<number>(configuratorAtom);
  const [savedConfig, setSavedConfig] = useRecoilState(savedConfigAtom);
  const [currentConfigChoice, setCurrentConfigChoice] = useRecoilState(optionsCurrentConfigAtom);
  let isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return () => setCurrentPage(1);
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
