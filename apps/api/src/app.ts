import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { healthRouter } from "./routes/health";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}