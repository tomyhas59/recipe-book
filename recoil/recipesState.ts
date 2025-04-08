import { atom } from "recoil";
import { Recipe } from "../services/recipes";

export const recipesState = atom<Recipe[]>({
  key: "recipesState",
  default: [],
});
