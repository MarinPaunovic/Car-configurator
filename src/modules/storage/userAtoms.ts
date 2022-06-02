import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userAuthPersistState = atom({
  key: "AuthPersist",
  default: false,
});

interface UserAtom {
  name: string | null;
  email: string | null;
  uid: string | null;
}

export const userAtom = atom<UserAtom>({
  key: "UserInfo",
  default: { name: "", email: "", uid: "" },
  effects_UNSTABLE: [persistAtom],
});
