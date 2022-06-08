import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { editConfigsAtom, selectedCarAtom } from "../../storage/carAtoms";

const Options = () => {
  const { year, carModel } = useRecoilValue(selectedCarAtom);
  const [edit, setEdit] = useRecoilState(editConfigsAtom);

  let isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setEdit(false);
  }, []);
  return (
    <div className="previewOptions">
      <div className="previewOptions__left">
        <Link to="/configure">
          <img src={require("../../../images/navigateBack.png")} style={{ blockSize: "22px" }} />
        </Link>
        <div className="previewOptions__left__year">{year}</div>
        <div className="previewOptions__left__carModel">{carModel}</div>
      </div>

      {edit ? (
        <div>
          <div>exterior</div>
          <div>interior</div>
          <div>summarry</div>
        </div>
      ) : (
        <div className="previewOptions__right">
          <Link className="previewOptions__right__edit" to="/configurationView" onClick={() => setEdit(true)}>
            Edit configuration
          </Link>
          <button className="previewOptions__right__delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Options;
