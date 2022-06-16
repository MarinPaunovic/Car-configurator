import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../../auth/db";
import {
  CarConfig,
  carCustomConfiguratorAtom,
  savedConfigAtom,
  SavedConfigFetch,
  selectedCarAtom,
} from "../../storage/carAtoms";
import { savedConfigEditAtom } from "../../storage/editAtoms";
import { popupMenuAtom } from "../../storage/optionsAtom";

const SavedConfigs = () => {
  const savedConfigs = useRecoilValue<Array<SavedConfigFetch>>(savedConfigAtom);
  const [popupMenu, setPopupMenu] = useRecoilState(popupMenuAtom);
  const setSavedConfig = useSetRecoilState(savedConfigEditAtom);
  const carCustomEdit = useSetRecoilState(carCustomConfiguratorAtom);
  const selectedCar = useSetRecoilState(selectedCarAtom);
  const navigate = useNavigate();

  const handleEdit = async (id: string) => {
    setPopupMenu("");
    await getDoc(doc(db, "SavedConfigurations", id)).then(async (snap) => {
      if (snap.exists()) {
        console.log(snap.data().carModel);
        let array: CarConfig = {
          carModel: snap.data().carModel,
          exterior: { color: snap.data().exterior.color, wheels: snap.data().exterior.wheels },
          interior: { dash: snap.data().interior.dash, seats: snap.data().interior.seats },
        };
        await getDocs(query(collection(db, "Cars"), where("carModel", "==", snap.data().carModel))).then((snap) => {
          selectedCar(snap.docs[0].data());
        });
        setSavedConfig(id);
        carCustomEdit(array);
      }
    });
    navigate("/configurationEdit");
  };

  const handleDelete = (id: string) => {
    console.log(id);
    setPopupMenu("");
    // deleteDoc(doc(db, "SavedConfigurations", id));
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
                onClick={() => {
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
                <button className="savedConfigs__deleteButton" onClick={() => handleDelete(item.id)}>
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