import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedCarAtom } from "../../storage/carAtoms";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";
import Pagination from "../pagination/pagination";

const CarPhotoSlider = () => {
  const { carModel, color } = useRecoilValue(selectedCarAtom);
  console.log(color);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  let pages: number = 5;

  let isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log(color);
    return () => {
      setCurrentPage(1);
    };
  }, []);
  return (
    <>
      {color && (
        <>
          <img
            className="configurationView__img"
            src={require("../../../images/" + carModel + "_" + color[0] + "_preview/" + currentPage + ".png")}
            style={{ blockSize: "300px" }}
          />
          <Pagination pagesNumber={pages} />
        </>
      )}
    </>
  );
};

export default CarPhotoSlider;
