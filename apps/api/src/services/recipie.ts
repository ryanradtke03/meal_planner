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

  async getRecipeById(userId: string, recipeId: string) {
    return prisma.recipe.findUnique({
      where: { id: recipeId, createdById: userId },
      include: {
        ingredients: true,
        steps: {
          orderBy: { order: "asc" },
        },
      },
    });
  },

  async updateRecipie(
    userId: string,
    recipeId: string,
    data: Partial<CreateRecipeInput>,
  ) {
    // Find existing recipe to ensure it belongs to the user
    const existing = await prisma.recipe.findUnique({
      where: { id: recipeId, createdById: userId },
    });

    if (!existing) {
      throw new Error("Recipe not found or unauthorized");
    }

    // Update the recipe
    return prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        servings: data.servings ?? existing.servings,
        prepTimeMin: data.prepTimeMin ?? existing.prepTimeMin,
        cookTimeMin: data.cookTimeMin ?? existing.cookTimeMin,
      },
      include: {
        ingredients: true,
        steps: {
          orderBy: { order: "asc" },
        },
      },
    });
  },

  async deleteRecipie(userId: string, recipeId: string) {
    return prisma.recipe.delete({
      where: { id: recipeId, createdById: userId },
      include: {
        ingredients: true,
        steps: {
          orderBy: { order: "asc" },
        },
      },
    });
  },
};
