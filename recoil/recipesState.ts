import { atom } from "recoil";
import { Recipe } from "../services/recipeService";

export const recipesState = atom<Recipe[]>({
  key: "recipesState",
  default: [],
});
