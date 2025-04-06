import { atom } from "recoil";
import { User } from "../data/user";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
