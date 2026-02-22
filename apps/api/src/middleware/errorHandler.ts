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
  const e = err as { status?: number; message?: string };

  const status = typeof e.status === "number" ? e.status : 500;

   return res.status(400).json({
      error: "Invalid JSON body",
    });
  }

  if (status >= 500) {
    console.error(err);
  }

  return res.status(status).json({
    error: e.message ?? "Internal server error",
  });
}
