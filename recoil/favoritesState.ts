import { atom } from "recoil";
import { Favorite } from "../services/favorites";

export const favoritesState = atom<Favorite[]>({
  key: "favoritesState",
  default: [],
});
