import api from "./index";
import { Recipe } from "../types/type";

export const recipeService = {
  // 최신 레시피 목록 (페이징)
  async getRecent(page = 0, size = 10) {
    const res = await api.get(`/recipes`, { params: { page, size } });
    return res.data as {
      content: Recipe[];
      totalPages: number;
      totalElements: number;
    };
  },

  // 레시피 생성
  async create(recipe: Recipe, userId: string) {
    const res = await api.post(`/recipes`, null, {
      params: { userId },
      data: recipe,
    });
    return res.data as Recipe;
  },

  // 특정 유저의 레시피 목록 (페이징)
  async getUserRecipes(creatorId: string, page = 0, size = 10) {
    const res = await api.get(`/recipes/${creatorId}/userRecipes`, {
      params: { page, size },
    });
    return res.data as {
      content: Recipe[];
      totalPages: number;
      totalElements: number;
    };
  },

  // 레시피 상세 조회
  async getById(recipeId: number) {
    const res = await api.get(`/recipes/${recipeId}`);
    return res.data as Recipe;
  },

  // 레시피 삭제
  async remove(recipeId: number, userId: string) {
    await api.delete(`/recipes/${recipeId}`, { params: { userId } });
  },

  // 레시피 수정
  async update(recipeId: number, userId: string, updatedRecipe: Recipe) {
    const res = await api.put(`/recipes/${recipeId}`, updatedRecipe, {
      params: { userId },
    });
    return res.data as Recipe;
  },
};
