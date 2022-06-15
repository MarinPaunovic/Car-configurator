import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../auth/db";
import { savedConfigAtom, SavedConfigFetch } from "../../storage/carAtoms";
import { popupMenuAtom } from "../../storage/optionsAtom";

const SavedConfigs = () => {
  const savedConfigs = useRecoilValue<Array<SavedConfigFetch>>(savedConfigAtom);
  const [popupMenu, setPopupMenu] = useRecoilState(popupMenuAtom);
  const [toggle, setToggle] = useState(false);

  const handleDelete = (id: string) => {
    deleteDoc(doc(db, "SavedConfigurations", id));
  };
  return (
    <>
      {Object.keys(savedConfigs).length &&
        savedConfigs.map((item, i: number) => (
          <div className="savedConfigs__wrapper" key={i}>
            <div>
              <img
                src={require("../../../images/" + item.carModel + "/exterior/" + item.color + "/" + item.wheels + "/3.png")}
                style={{ blockSize: "150px" }}
              />
            </div>
            <div className="savedConfigs__splitter"></div>
            <div>
              <div>
                <div className="savedConfigs__info">
                  <div className="savedConfigs__info__wrapper">
                    <p>{item.productionYear}</p>
                    <p>{item.carModel}</p>
                    <p>{item.color}</p>
                  </div>
                  <div className="savedConfigs__createdAt">
                    <p>Created</p>
                    <p>{item.createdAt && item.createdAt[0]}</p>
                    <p>{item.createdAt && item.createdAt[1]}nd</p>
                    <p>{item.createdAt && item.createdAt[2]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="savedConfigs__button"
              onClick={() => {
                if (popupMenu && popupMenu === item.id) {
                  setPopupMenu("");
                } else setPopupMenu(item.id);
              }}
            >
              <span className="material-symbols-outlined savedConfigs__button__vert">more_vert</span>
              <div
                className="savedConfigs__popupMenu"
                style={popupMenu === item.id ? { display: "flex" } : { display: "none" }}
              >
                <button onClick={() => undefined}>Edit Configuration</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SavedConfigs;
