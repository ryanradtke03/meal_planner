import { Request, Response } from "express";
import { z } from "zod";
import { createRecipeService } from "../services/recipie";

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
    })
  ),
  steps: z.array(
    z.object({
      order: z.number().int(),
      title: z.string().optional(),
      instructions: z.string().min(1),
    })
  ),
});

export async function createRecipe(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const parsed = createRecipeSchema.parse(req.body);

    const recipe = await createRecipeService(userId, parsed);

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