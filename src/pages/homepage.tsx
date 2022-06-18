import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { auth, db } from "../modules/auth/db";
import Configurator from "../modules/components/homepage/configurator";
import SavedConfigs from "../modules/components/homepage/savedConfigs";
import NavbarComponent from "../modules/components/navbar/navbarComponent";
import { ICar, savedConfigAtom, SavedConfigFetch } from "../modules/storage/carAtoms";
import { deleteMessageAtom } from "../modules/storage/deleteMessageAtom";
import { popupMenuAtom } from "../modules/storage/optionsAtom";

const Homepage = () => {
  const [savedConfigs, setSavedConfig] = useRecoilState<ICar[]>(savedConfigAtom);
  const deleteMessage = useRecoilValue(deleteMessageAtom);
  const setPopupMenu = useSetRecoilState(popupMenuAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: Unsubscribe = () => {};
    console.log("test");
    if (auth.currentUser) {
      unsub = onSnapshot(query(collection(db, "SavedConfigurations"), where("uid", "==", auth.currentUser.uid)), (snap) => {
        const savedConfig = snap.docs.map((item) => {
          let dataFetch: SavedConfigFetch = {
            id: item.id,
            carModel: item.data().carModel,
            wheels: item.data().exterior.wheels,
            seats: item.data().interior.seats,
            dash: item.data().interior.dash,
            color: item.data().exterior.color,
            productionYear: item.data().productionYear,
            createdAt: new Date(item.data().createdAt.seconds * 1000)
              .toLocaleDateString("en", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              .replace(",", "")
              .split(" "),
          };
          return dataFetch;
        });
        console.log(savedConfig);
        setSavedConfig(savedConfig);
        setLoading(false);
      });
    }
    return () => {
      setPopupMenu("");
      unsub();
    };
  }, [auth.currentUser]);

  return (
    <div className="homepage">
      <NavbarComponent />

      {loading ? (
        <div>Loading...</div>
      ) : Object.keys(savedConfigs).length ? (
        <div className="homepage__savedConfigs">
          <div className="homepage__deleteMessage" style={deleteMessage ? { left: "84.5%" } : { left: "100%" }}>
            <p style={{ textAlign: "center" }}>Your configuration is successfully deleted!</p>
          </div>
          <div className="homepage__savedConfigs__title">View saved configurations</div>
          <SavedConfigs />
        </div>
      ) : (
        <>
          <div
            className="homepage__deleteMessage"
            style={deleteMessage ? { left: "84.5%", top: "15%" } : { left: "100%", top: "15%" }}
          >
            <p style={{ textAlign: "center" }}>Your configuration is successfully deleted!</p>
          </div>
          <Configurator />
        </>
      )}
    </div>
  );
};

export default Homepage;
