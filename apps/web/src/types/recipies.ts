export type RecipeListItem = {
  id: string;
  title: string;
  description: string | null;
  servings: number;
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type RecipeIngredient = {
  id: string;
  name: string;
  amount: string;
  recipeId: string;
  createdAt: string;
};

export type RecipeStep = {
  id: string;
  order: number;
  title: string;
  instructions: string;
  recipeId: string;
  createdAt: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string | null;
  servings: number;
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
};

export type Ingredient = { name: string; amount: string };
export type Step = { title: string; instructions: string };

export type RecipeFormData = {
  title: string;
  description: string;
  servings: number;
  prepTimeMin: number;
  cookTimeMin: number;
  ingredients: Ingredient[];
  steps: Step[];
};
