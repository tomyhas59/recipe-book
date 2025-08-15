import { atom } from "recoil";
import { Recipe } from "../types/types";

export const recipesState = atom<Recipe[]>({
  key: "recipesState",
  default: [],
});
