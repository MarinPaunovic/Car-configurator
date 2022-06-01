import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userAuthStatePersist = atom({
  key: "AuthPersist",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userAuthState = atom({
  key: "Auth",
  default: false,
});
