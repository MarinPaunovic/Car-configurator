import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { auth, db } from "../modules/auth/db";
import Configurator from "../modules/components/homepage/configurator";
import SavedConfigs from "../modules/components/homepage/savedConfigs";
import NavbarComponent from "../modules/components/navbar/navbarComponent";
import { ICar, savedConfigAtom, SavedConfigFetch } from "../modules/storage/carAtoms";

const Homepage = () => {
  const [savedConfigs, setSavedConfig] = useRecoilState<ICar[]>(savedConfigAtom);
  let isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (auth.currentUser) {
      getDocs(query(collection(db, "SavedConfigurations"), where("uid", "==", auth.currentUser.uid))).then((data) => {
        const savedConfig = data.docs.map((item) => {
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
      });
    }
  }, []);
  return (
    <div className="homepage">
      <NavbarComponent />
      {savedConfigs ? (
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
