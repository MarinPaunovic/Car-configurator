import { collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { db } from "../../auth/db";
import { selectedCarAtom } from "../../storage/carAtoms";

interface ICar {
  carModel: string;
  wheels: Array<string>;
  seats: Array<string>;
  dash: Array<string>;
  color: Array<string>;
  productionYear: number;
}

const SelectCarComponent = () => {
  const setSelectedCar = useSetRecoilState(selectedCarAtom);
  const [cars, setCars] = useState<ICar[]>();
  let isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    getDocs(collection(db, "Cars")).then((data) => {
      const carArray = data.docs.map((item) => {
        let myTypeCarArray: ICar = {
          carModel: item.data().carModel,
          wheels: item.data().wheels,
          seats: item.data().seats,
          dash: item.data().dash,
          color: item.data().color,
          productionYear: item.data().productionYear,
        };
        return myTypeCarArray;
      });
      setCars(carArray);
    });
  }, []);

  return (
    <>
      <div className="selectCar__background"></div>
      <div className="selectCar__label">
        <p className="selectCar__label__one">Configure a car</p>
        <p className="selectCar__label__two">Pick your favorite model and start configuring.</p>
      </div>
      <div className="selectCar">
        {cars &&
          cars.map((item, i) => {
            return (
              <div className="selectCar__car" key={i}>
                <img
                  src={require("../../../images/" + item.carModel + ".png")}
                  style={{ blockSize: "450px" }}
                  className="selectCar__car__img"
                ></img>
                <div className="selectCar__car__textWrapper">
                  <div className="selectCar__car__productionYear">{item.productionYear}</div>
                  <div className="selelctCar__car__carModel">{item.carModel}</div>
                  <Link
                    className="selectCar__car__button"
                    onClick={() =>
                      setSelectedCar({ carModel: item.carModel, year: item.productionYear, defaultColor: item.color[0] })
                    }
                    to="/configurationView"
                  >
                    Configure Now
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SelectCarComponent;