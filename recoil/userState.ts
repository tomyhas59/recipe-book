import { atom } from "recoil";

export const userState = atom<boolean>({
  key: "userState",
  default: false,
});
