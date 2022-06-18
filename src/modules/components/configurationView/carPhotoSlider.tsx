import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CarConfig, carCustomConfiguratorAtom, selectedCarAtom } from "../../storage/carAtoms";
import { savedConfigEditAtom, summaryAtom } from "../../storage/editAtoms";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";

import Pagination from "../pagination/pagination";

const CarPhotoSlider = () => {
  const { carModel, color, wheels } = useRecoilValue(selectedCarAtom);
  const savedConfigEdit = useRecoilValue(savedConfigEditAtom);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const summary = useRecoilValue(summaryAtom);
  const carCustomConfig = useRecoilValue<CarConfig>(carCustomConfiguratorAtom);
  let pages: number = 5;
  // let isMounted = useRef(false);
  useEffect(() => {
    // if (!isMounted.current) {
    //   isMounted.current = true;
    //   return;
    // }
    return () => {
      setCurrentPage(1);
    };
  }, []);
  return (
    <>
      {color && (
        <>
          {summary || savedConfigEdit ? (
            <img
              className="configurationView__img"
              src={require("../../../images/" +
                carCustomConfig.carModel +
                "/exterior/" +
                carCustomConfig.exterior.color +
                "/" +
                carCustomConfig.exterior.wheels +
                "/" +
                currentPage +
                ".png")}
              style={{ blockSize: "300px" }}
            />
          ) : (
            <img
              className="configurationView__img"
              src={require("../../../images/" +
                carModel +
                "/exterior/" +
                color[0] +
                "/" +
                wheels[0] +
                "/" +
                currentPage +
                ".png")}
              style={{ blockSize: "300px" }}
            />
          )}
          <Pagination pagesNumber={pages} />
        </>
      )}
    </>
  );
};

export default CarPhotoSlider;
