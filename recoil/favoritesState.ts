import { atom } from "recoil";
import { Favorite } from "../types/types";

export const favoritesState = atom<Favorite[]>({
  key: "favoritesState",
  default: [],
});
