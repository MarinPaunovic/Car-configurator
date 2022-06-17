import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { auth, db } from "../modules/auth/db";
import Configurator from "../modules/components/homepage/configurator";
import SavedConfigs from "../modules/components/homepage/savedConfigs";
import NavbarComponent from "../modules/components/navbar/navbarComponent";
import { ICar, savedConfigAtom, SavedConfigFetch } from "../modules/storage/carAtoms";

const Homepage = () => {
  const [savedConfigs, setSavedConfig] = useRecoilState<ICar[]>(savedConfigAtom);

  const [loading, setLoading] = useState(true);

  let isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    let unsub: Unsubscribe = () => {};
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
        setSavedConfig(savedConfig);
        setLoading(false);
      });
    }
    return () => {
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
          <div className="homepage__savedConfigs__title">View saved configurations</div>
          <SavedConfigs />
        </div>
      ) : (
        <Configurator />
      )}
    </div>
  );
};

export default Homepage;
