import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { loginUser, registerUser } from "../services/auth";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function register(req: Request, res: Response) {
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
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid request body",
        details: error.flatten(),
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message || "Registration Error",
      });
    }

    return res.status(400).json({
      error: "Registration Error",
    });
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        error: "Invalid body",
      });
    }

    const result = await loginUser({ email, password });

    // Set cookie
    res.cookie(result.cookie.name, result.cookie.value, result.cookie.options);

    return res.status(200).json({
      user: result.user,
    });
  } catch (error: unknown) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw Object.assign(new Error("Not authenticated"), { status: 401 });
    }

    return res
      .status(200)
      .json({ user: { id: req.user.id, email: req.user.email } });
  } catch (error: unknown) {
    next(error);
  }
}
