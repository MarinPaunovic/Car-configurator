import { atom } from "recoil";
import { persistAtom } from "./userAtoms";

export const selectedCarAtom = atom({
  key: "selectedCar",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const previewCurrentPageAtom = atom({
  key: "previewPagination",
  default: 1,
});
