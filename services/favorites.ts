import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Recipe } from "../data/recipes";
import { Favorite } from "../data/user";

export const addToFavorites = async (recipe: Recipe, userId: string) => {
  try {
    await addDoc(collection(db, "favorites"), {
      userId,
      recipeId: recipe.id,
      name: recipe.name,
      description: recipe.description,
    });
    console.log("즐겨찾기 추가 완료");
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
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Favorite[];
  } catch (error) {
    console.error("Firestore에서 즐겨찾기 불러오기 실패:", error);
    return [];
  }
};
