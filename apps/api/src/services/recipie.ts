import { prisma } from "../db/prisma";
import type { CreateRecipeInput } from "../schemas/recipie";

export const recipeService = {
  async createRecipeService(userId: string, data: CreateRecipeInput) {
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
  },

  async listRecipes(userId: string) {
    return prisma.recipe.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  },
};
