import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  servings: z.number().int().positive().optional(),
  prepTimeMin: z.number().int().positive().optional(),
  cookTimeMin: z.number().int().positive().optional(),

  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    }),
  ),

  steps: z.array(
    z.object({
      order: z.number().int(),
      title: z.string().optional(),
      instructions: z.string(),
    }),
  ),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
