import { api } from "./api";

export const favoriteService = {
  toggle: async (userId: number, recipeId: number) => {
    const res = await api.post(`/favorites/${userId}/toggle/${recipeId}`);
    return res.data;
  },
  getFavorites: async (userId: number) => {
    const res = await api.get(`/favorites/${userId}`);
    return res.data;
  },

  isFavorite: async (userId: number, recipeId: number) => {
    const res = await api.get(`/favorites/isFavorite`, {
      params: { userId, recipeId },
    });
    return res.data as boolean;
  },
};
