import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { configuratorAtom, selectedCarAtom } from "../../storage/carAtoms";
import { getTitleAtom, localEditAtom } from "../../storage/editAtoms";
import { optionsCurrentConfigAtom } from "../../storage/optionsAtom";

const Options = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
  const [currentConfig, setCurrentConfig] = useRecoilState(configuratorAtom);
  const optionsCurrentConfig = useRecoilValue(optionsCurrentConfigAtom);
  const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom);
  const title = useRecoilValue(getTitleAtom);
  const setLocalEdit = useSetRecoilState(localEditAtom);
  const currentPage = window.location.pathname;
  let isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return () => {
      setCurrentConfig(1);
      setLocalEdit({ edit: "", value: "" });
    };
  }, []);
  return (
    <div className={optionsCurrentConfig ? "options__short" : "options"}>
      <div className={optionsCurrentConfig ? "options__left__second" : "options__left"}>
        <Link to="/configure">
          <img src={require("../../../images/navigateBack.png")} style={{ blockSize: "22px" }} />
        </Link>
        <div className="options__left__year">{year}</div>
        <div className="options__left__carModel">{carModel}</div>
      </div>

      {currentPage === "/configurationEdit" ? (
        optionsCurrentConfig ? (
          <div className="options__edit__right__second">
            <div className="options__edit__right__second__title">{title}</div>
            <span
              className="material-symbols-outlined options__edit__right__second__title__x"
              onClick={() => {
                setCurrentConfigChoice("");
                setLocalEdit({ value: "", edit: "" });
              }}
            >
              x
            </span>
          </div>
        ) : (
          <div className="options__edit__right">
            {currentConfig > 1 && (
              <button onClick={() => setCurrentConfig(currentConfig - 1)} className="options__edit__right__arrowLeft">
                <span className="material-symbols-outlined">keyboard_arrow_left</span>
              </button>
            )}
            <div
              className="options__edit__right__block"
              style={currentConfig === 1 ? { fontWeight: "700" } : { fontWeight: "400" }}
            >
              <p style={{ fontWeight: "400", color: "#9D9DAF" }}>01</p> Exterior
            </div>
            <div
              className="options__edit__right__block"
              style={currentConfig === 2 ? { fontWeight: "700" } : { fontWeight: "400" }}
            >
              <p style={{ fontWeight: "400", color: "#9D9DAF" }}>02</p> Interior
            </div>{" "}
            <div
              className="options__edit__right__block"
              style={currentConfig === 3 ? { fontWeight: "700" } : { fontWeight: "400" }}
            >
              <p style={{ fontWeight: "400", color: "#9D9DAF" }}>03</p> Summary
            </div>
          </div>
        )
      ) : (
        <div className="options__right">
          <Link className="options__right__edit" to="/configurationEdit">
            Edit configuration
          </Link>
          <button className="options__right__delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Options;
