export type User = {
  id: string;
  email: string;
  nickname: string;
  password: string;
  recipes?: Recipe[]; // 선택적으로 포함
  favorites?: Favorite[];
};

export type Recipe = {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  creator: User;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  favorites?: Favorite[];
};

export type Ingredient = {
  id: number;
  name: string;
  amount: string;
  recipe: Recipe;
};

export type Instruction = {
  id: number;
  stepNumber: number;
  description: string;
  recipe: Recipe;
};

export type Favorite = {
  id: number;
  user: User;
  recipe: Recipe;
};
