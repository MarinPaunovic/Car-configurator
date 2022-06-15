import { atom, selector } from "recoil";
import { persistAtom } from "./userAtoms";

export const getTitleAtom = atom({
  key: "getTitle",
  default: "",
});

type Edit = {
  value: string;
  edit: string;
};

export const localEditAtom = atom({
  key: "localEditAtom",
  default: <Edit>{},
});

export const localEditSelector = selector({
  key: "localEditSelector",

  get: ({ get }) => {
    const { value, edit } = get(localEditAtom);
    switch (edit) {
      case "color":
        return { value, edit };
      case "wheels":
        return { value, edit };
      case "seats":
        return { value, edit };
      case "dash":
        return { value, edit };
      default:
        return;
    }
  },
});

export const summaryAtom = atom({
  key: "summaryAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
