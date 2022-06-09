import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { carCustomConfiguratorAtom, configuratorAtom, savedConfigAtom, selectedCarAtom } from "../../storage/carAtoms";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";
import Pagination from "../pagination/pagination";
import PopupInfo from "../popupInfo/popupInfo";

const EditDetails = () => {
  const [carConfig, setCarConfig] = useRecoilState(carCustomConfiguratorAtom);
  const { carModel } = useRecoilValue(selectedCarAtom);
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const [currentConfig, setCurrentConfig] = useRecoilState(configuratorAtom);
  let test = { exterior: { color: "black", wheels: "black" }, interior: { seats: "black", dash: "black" } };
  const [savedConfig, setSavedConfig] = useRecoilState(savedConfigAtom);
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
      ) : (
        carConfig && (
          <div className="editDetails__new">
            <div className="editDetails__img">
              <img
                src={require("../../../images/" +
                  carModel +
                  "_" +
                  carConfig.exterior.color +
                  "_preview/" +
                  currentPage +
                  ".png")}
                style={{ width: "100%" }}
              />
              <Pagination pagesNumber={5} />
            </div>

            <div className="editDetails__choice">
              <div>
                <div>color</div>
                <div>wheels</div>
              </div>
              <div>
                <PopupInfo text={"text info unutar edita"} className="editDetails__choice__popup" />
                <button onClick={() => setCurrentConfig(currentConfig + 1)}>Interior</button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EditDetails;
