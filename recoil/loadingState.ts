// recoil/loadingState.ts
import { atom } from "recoil";

export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});
