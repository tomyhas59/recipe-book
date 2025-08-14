import { atom } from "recoil";
import { Favorite } from "../services/favoritesService";

export const favoritesState = atom<Favorite[]>({
  key: "favoritesState",
  default: [],
});
