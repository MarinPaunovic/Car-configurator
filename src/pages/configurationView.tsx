import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../modules/auth/db";
import Options from "../modules/components/configurationView/options";
import NavbarComponent from "../modules/components/navbar/navbarComponent";
import Pagination from "../modules/components/pagination/pagination";
import { previewCurrentPageAtom, selectedCarAtom } from "../modules/storage/carAtoms";
import { userAtom } from "../modules/storage/userAtoms";

const ConfigurationView = () => {
  const { uid } = useRecoilValue(userAtom);
  const { carModel, defaultColor } = useRecoilValue(selectedCarAtom);
  const currentPage = useRecoilValue(previewCurrentPageAtom);
  let pages: number = 5;
  let isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    // addDoc(collection(db, "SavedConfigurations"), { uid: uid, carModel: carModel });
  }, []);
  return (
    <>
      <NavbarComponent />
      <Options />
      <div className="configurationView__background"></div>
      <img
        src={require("../images/" + carModel + "_" + defaultColor + "_preview/" + currentPage + ".png")}
        style={{ blockSize: "100px" }}
      />
      <Pagination pagesNumber={pages} />
    </>
  );
};

export default ConfigurationView;
