import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import authRoutes from "./routes/auth";
import healthRouter from "./routes/health";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(healthRouter);
  app.use("/auth", authRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
