// data/user.ts
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Favorite {
  id: string;
  userId: string;
  recipeId: string;
  name: string;
  description: string;
}
