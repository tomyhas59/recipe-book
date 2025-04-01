import { atom } from "recoil";

import { Recipe } from "../data/recipes";

export const favoritesState = atom<Recipe[]>({
  key: "favoritesState",
  default: [],
});
