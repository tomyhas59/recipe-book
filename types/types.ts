export type User = {
  id?: number;
  email: string;
  password: string;
  nickname: string;
};

export type Recipe = {
  id?: number;
  name: string;
  category: string;
  description: string;
  content: string;
  image: string;
  creator: User;
  isFavorite?: boolean;
};

export type Favorite = {
  id?: number;
  userId: number;
  recipe: Recipe;
};
