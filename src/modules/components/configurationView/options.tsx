import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { configuratorAtom, selectedCarAtom } from "../../storage/carAtoms";

const Options = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
  const currentConfig = useRecoilValue(configuratorAtom);
  const currentPage = window.location.pathname;
  return (
    <div className="options">
      <div className="options__left">
        <Link to="/configure">
          <img src={require("../../../images/navigateBack.png")} style={{ blockSize: "22px" }} />
        </Link>
        <div className="options__left__year">{year}</div>
        <div className="options__left__carModel">{carModel}</div>
      </div>

      {currentPage === "/configurationEdit" ? (
        <div className="options__edit__right">
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
            <p style={{ fontWeight: "400", color: "#9D9DAF" }}>01</p> Interior
          </div>{" "}
          <div
            className="options__edit__right__block"
            style={currentConfig === 3 ? { fontWeight: "700" } : { fontWeight: "400" }}
          >
            <p style={{ fontWeight: "400", color: "#9D9DAF" }}>01</p> Summary
          </div>
        </div>
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
