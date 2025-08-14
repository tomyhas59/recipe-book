export type User = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  recipes?: Recipe[];
  favorites?: Favorite[];
};

export type Recipe = {
  id?: number;
  name: string;
  description: string;
  category: string;
  image: string | null;
  creator?: User;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  favorites?: Favorite[];
};

export type Ingredient = {
  id?: number;
  name: string;
  amount: string;
};

export type Instruction = {
  id?: number;
  stepNumber: number;
  description: string;
};

export type Favorite = {
  id?: number;
  user: User;
  recipe: Recipe;
};
