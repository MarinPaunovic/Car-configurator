import { atom, selector } from "recoil";
import { persistAtom } from "./userAtoms";

export interface ICar {
  carModel: string;
  wheels: Array<string>;
  seats: Array<string>;
  dash: Array<string>;
  color: Array<string>;
  productionYear: number;
}

export const carsAtom = atom({
  key: "cars",
  default: <ICar>{},
  effects_UNSTABLE: [persistAtom],
});

export const selectedCarAtom = atom({
  key: "selectedCar",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const configuratorAtom = atom({
  key: "currentConfigurator",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const carDefaultConfiguratorSelector = selector({
  key: "defaultCarConfigurator",

  get: ({ get }) => {
    const { carModel } = get(selectedCarAtom);
    switch (carModel) {
      case "Audi RS6":
        return {
          carModel: "Audi RS6",
          exterior: { color: "ultra-blue", wheels: "one" },
          interior: { seats: "brown", dash: "brown" },
        };
      case "Audi e-Tron GT":
        return {
          carModel: "Audi e-Tron GT",
          exterior: { color: "tactical-green", wheels: "one" },
          interior: { seats: "black", dash: "black" },
        };
      case "Audi RS5":
        return {
          carModel: "Audi RS5",
          exterior: { color: "nardo-gray", wheels: "one" },
          interior: { seats: "black-gray", dash: "lunar-silver" },
        };
      default:
        return;
    }
  },
});

export const carCustomConfiguratorAtom = atom({
  key: "customCarConfigurator",
  default: carDefaultConfiguratorSelector,
});

export const savedConfigAtom = atom({
  key: "savedConfiguration",
  default: {},
});
