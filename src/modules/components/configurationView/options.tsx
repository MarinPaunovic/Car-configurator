import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectedCarAtom } from "../../storage/carAtoms";

const Options = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
  return (
    <div className="previewOptions">
      <div className="previewOptions__left">
        <Link to="/configure">
          <img src={require("../../../images/navigateBack.png")} style={{ blockSize: "22px" }} />
        </Link>
        <div className="previewOptions__left__year">{year}</div>
        <div className="previewOptions__left__carModel">{carModel}</div>
      </div>
      <div className="previewOptions__right">
        <button className="previewOptions__right__edit">Edit configuration</button>
        <button className="previewOptions__right__delete">Delete</button>
      </div>
    </div>
  );
};

export default Options;
