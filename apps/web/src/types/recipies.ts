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
