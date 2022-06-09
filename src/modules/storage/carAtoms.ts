import { atom, selector } from "recoil";
import { persistAtom } from "./userAtoms";

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
        return { exterior: { color: "ultra-blue", wheels: "one" }, interior: { seats: "brown-seats", dash: "brown-dash" } };
      case "Audi e-Tron GT":
        return { exterior: { color: "tactical-green", wheels: "one" }, interior: { seats: "black", dash: "black" } };
      case "Audi RS5":
        return { exterior: { color: "nardo-gray", wheels: "one" }, interior: { seats: "black-grey", dash: "lunar-silver" } };
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
