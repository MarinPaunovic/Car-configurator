import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { auth, db } from "../../auth/db";
import {
  CarConfig,
  carCustomConfiguratorAtom,
  savedConfigAtom,
  SavedConfigFetch,
  selectedCarAtom,
} from "../../storage/carAtoms";
import { deleteMessageAtom } from "../../storage/deleteMessageAtom";
import { savedConfigEditAtom } from "../../storage/editAtoms";
import { popupMenuAtom } from "../../storage/optionsAtom";

const SavedConfigs = () => {
  const setDeleteMessage = useSetRecoilState(deleteMessageAtom);
  const savedConfigs = useRecoilValue<Array<SavedConfigFetch>>(savedConfigAtom);
  const [popupMenu, setPopupMenu] = useRecoilState(popupMenuAtom);
  const setSavedConfig = useSetRecoilState(savedConfigEditAtom);
  const carCustomEdit = useSetRecoilState(carCustomConfiguratorAtom);
  const selectedCar = useSetRecoilState(selectedCarAtom);
  const navigate = useNavigate();

  const handleEdit = async (id: string) => {
    await getDoc(doc(db, "SavedConfigurations", id)).then(async (snap) => {
      if (snap.exists()) {
        console.log(snap.data().carModel);
        let array: CarConfig = {
          carModel: snap.data().carModel,
          exterior: { color: snap.data().exterior.color, wheels: snap.data().exterior.wheels },
          interior: { dash: snap.data().interior.dash, seats: snap.data().interior.seats },
        };
        await getDocs(query(collection(db, "Cars"), where("carModel", "==", snap.data().carModel))).then((snap) => {
          console.log(snap.docs[0].data(), "SNAPSHOT");
          selectedCar(snap.docs[0].data());
        });
        setSavedConfig(id);
        carCustomEdit(array);
      }
    });
    navigate("/configuration-view");
  };

  const handleDelete = (id: string) => {
    deleteDoc(doc(db, "SavedConfigurations", id)).then(() => toggleDeleteMessage());
  };
  const toggleDeleteMessage = () => {
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 4200);
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
            <div className="savedConfigs__button">
              <button
                className="material-symbols-outlined savedConfigs__button__vert"
                onClick={(e) => {
                  console.log(e.currentTarget.className);
                  if (popupMenu && popupMenu === item.id) {
                    setPopupMenu("");
                  } else setPopupMenu(item.id);
                }}
              >
                more_vert
              </button>
              <div
                className="savedConfigs__popupMenu"
                style={popupMenu === item.id ? { display: "flex" } : { display: "none" }}
              >
                <button className="savedConfigs__editButton" onClick={() => handleEdit(item.id)}>
                  Edit configuration
                </button>
                <span className="savedConfigs__button__splitter"></span>
                <button
                  className="savedConfigs__deleteButton"
                  onClick={() => {
                    setPopupMenu("");
                    window.confirm("Do you really want to delete configuration?") && handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SavedConfigs;
