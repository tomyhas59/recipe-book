import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  category: string;
  image: string | null;
}

export const addRecipe = async (recipe: Omit<Recipe, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), recipe);
    return docRef.id;
  } catch (e) {
    console.error("Error adding recipe: ", e);
    throw e;
  }
};

export const getRecipes = async (): Promise<Recipe[]> => {
  const querySnapshot = await getDocs(collection(db, "recipes"));

  const recipes: Recipe[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Recipe[];

  return recipes;
};

export const BASE_URL =
  "https://xmfpytnzdgynoolnnucp.supabase.co/storage/v1/object/public/recipe-book-image/recipe-image/";
