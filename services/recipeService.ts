import { api } from "./api";
import { Recipe } from "../types/types";

export const recipeService = {
  getAll: async () => {
    const res = await api.get("/recipes");
    return res.data as Recipe[];
  },
  getById: async (id: number) => {
    const res = await api.get(`/recipes/${id}`);
    return res.data as Recipe;
  },
  getByCategory: async (category: string) => {
    const res = await api.get(`/recipes/category/${category}`);
    return res.data as Recipe[];
  },
  create: async (userId: number, recipe: Recipe) => {
    const res = await api.post("/recipes", recipe, { params: { userId } });
    return res.data;
  },
  update: async (id: number, recipe: Recipe) => {
    const res = await api.put(`/recipes/${id}`, recipe);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await api.delete(`/recipes/${id}`);
    return res.data;
  },
};
