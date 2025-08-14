import api from "./index";
import { Favorite } from "../types/type";

export const favoriteService = {
  // 즐겨찾기 추가
  async add(recipeId: number, userId: string) {
    await api.post(`/recipes/${recipeId}/favorite`, null, {
      params: { userId },
    });
  },

  // 즐겨찾기 제거
  async remove(recipeId: number, userId: string) {
    await api.delete(`/recipes/${recipeId}/favorite`, {
      params: { userId },
    });
  },

  // 특정 유저의 즐겨찾기 목록
  async getUserFavorites(userId: string) {
    const res = await api.get(`/recipes/users/${userId}/favorite`);
    return res.data as Favorite[];
  },
};
