import { Request, Response } from "express";
import { z } from "zod";
import { recipeService } from "../services/recipie";

const createRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  servings: z.number().int().positive().optional(),
  prepTimeMin: z.number().int().positive().optional(),
  cookTimeMin: z.number().int().positive().optional(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1),
      amount: z.string().min(1),
    }),
  ),
  steps: z.array(
    z.object({
      order: z.number().int(),
      title: z.string().optional(),
      instructions: z.string().min(1),
    }),
  ),
});

export async function createRecipe(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const parsed = createRecipeSchema.parse(req.body);

    const recipe = await recipeService.createRecipeService(userId, parsed);

    return res.status(201).json(recipe);
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid request body",
        details: err.flatten(),
      });
    }

    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: "Unknown error" });
  }
}

export async function listRecipies(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const recipes = await recipeService.listRecipes(userId);

    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }

    return res.status(200).json(recipes);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: "Unknown error" });
  }
}

export async function getRecipieById(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const recipeId = req.params.id;

  if (!recipeId) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const recipe = await recipeService.getRecipeById(userId, recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(recipe);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: "Unknown error" });
  }
}
