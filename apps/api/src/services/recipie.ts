import { prisma } from "../db/prisma";
import type { CreateRecipeInput } from "../schemas/recipie";

export async function createRecipeService(
  userId: string,
  data: CreateRecipeInput,
) {
  return prisma.recipe.create({
    data: {
      title: data.title,
      description: data.description,
      servings: data.servings,
      prepTimeMin: data.prepTimeMin,
      cookTimeMin: data.cookTimeMin,
      createdById: userId,

      ingredients: {
        create: data.ingredients,
      },

      steps: {
        create: data.steps,
      },
    },
    include: {
      ingredients: true,
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });
}
