import { atom } from "recoil";

import { Favorite } from "../data/user";

export const favoritesState = atom<Favorite[]>({
  key: "favoritesState",
  default: [],
});
