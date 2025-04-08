import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Ingredient, Recipe } from "./recipes";

export interface Favorite {
  id: string;
  userId: string;
  recipeId: string;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
}

export const addToFavorites = async (recipe: Recipe, userId: string) => {
  if (!userId) {
    console.error("로그인한 사용자 없음");
    return;
  }

  try {
    await addDoc(collection(db, "favorites"), {
      userId,
      recipeId: recipe.id,
      name: recipe.name,
      description: recipe.description,
      image: recipe.image,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
  } catch (error) {
    console.error("즐겨찾기 추가 실패:", error);
  }
};

export const removeFavoriteFromFirestore = async (
  userId: string,
  recipeId: string
) => {
  const q = query(
    collection(db, "favorites"),
    where("userId", "==", userId),
    where("recipeId", "==", recipeId)
  );

  const snapshot = await getDocs(q);

  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
};
export const getFavorites = async (userId: string): Promise<Favorite[]> => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const favorites = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Favorite[];

    console.log(favorites);

    return favorites;
  } catch (error) {
    console.error("Firestore에서 즐겨찾기 불러오기 실패:", error);
    return [];
  }
};

export const checkFavorite = async (
  userId: string,
  recipeId: string
): Promise<boolean> => {
  try {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", userId),
      where("recipeId", "==", recipeId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("즐겨찾기 확인 오류:", error);
    return false;
  }
};
