// data/user.ts
export interface User {
  uid: string;
  email: string | null;
}

export interface Favorite {
  id: string;
  userId: string;
  recipeId: string;
  name: string;
  description: string;
}
