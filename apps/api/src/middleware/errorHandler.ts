import type { NextFunction, Request, Response } from "express";

type ErrorWithStatus = {
  status?: number;
  message?: string;
};

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const e = err as ErrorWithStatus;

  const status = typeof e.status === "number" ? e.status : 500;

  if (status >= 500) {
    console.error(err);
  }

  if (status === 401) {
    // Don't leak details
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.status(status).json({ error: "Internal server error" });
}
