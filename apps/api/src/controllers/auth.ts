import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { loginUser, registerUser } from "../services/auth";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function httpError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = registerSchema.parse(req.body);
    const user = await registerUser(parsed);

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginSchema.parse(req.body);

    const result = await loginUser(parsed);

    res.cookie(result.cookie.name, result.cookie.value, result.cookie.options);

    return res.status(200).json({
      user: result.user,
    });
  } catch (err) {
    // Keep login errors generic at the edge
    if (err instanceof z.ZodError) {
      return next(httpError(400, "Invalid request body"));
    }
    return next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw httpError(401, "Not authenticated");
    }

    return res.status(200).json({
      user: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  } catch (err) {
    return next(err);
  }
}
