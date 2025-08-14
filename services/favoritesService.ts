import { api } from "./api";

export const favoriteService = {
  toggle: async (recipeId: number) => {
    const res = await api.post(`/favorites/${recipeId}/toggle`);
    return res.data;
  },
  getFavorites: async () => {
    const res = await api.get("/favorites");
    return res.data;
  },
};
