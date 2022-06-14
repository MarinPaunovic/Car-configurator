import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { carCustomConfiguratorAtom, selectedCarAtom } from "../../../storage/carAtoms";
import { optionsCurrentConfigAtom } from "../../../storage/optionsAtom";

type ColorTitle = {
  color: string;
};

const ColorTitleComponent = (props: ColorTitle) => {
  const { color } = props;
  const [colorTitle, setColorTitle] = useState("");

  useEffect(() => {
    handleColorTitle();
  }, []);

  const handleColorTitle = () => {
    switch (color) {
      case "brown":
        setColorTitle("Cognac Brown");
        return;
      case "black-gray":
        setColorTitle("Black and Gray");
        return;
      case "black-red":
        setColorTitle("Black and Red");
        return;
      case "red":
        setColorTitle("Red");
        return;
      case "black":
        setColorTitle("Black");
        return;
      case "lunar-silver":
        setColorTitle("Lunar Silver");
        return;
      default:
        return;
    }
  };

  return <p>{colorTitle}</p>;
};
export default ColorTitleComponent;
