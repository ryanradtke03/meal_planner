import { createApp } from "./app";
import { envInt } from "./config/env";
import { prisma } from "./db/prisma";

const app = createApp();
const port = envInt("PORT", 3001);

async function start() {
  const dbUrl = process.env.DATABASE_URL ?? process.env.DATABASE_URL; // optional fallback
  if (!dbUrl) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }

  try {
    await prisma.$connect();
    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received, shutting down...`);
    server.close(async () => {
      try {
        await prisma.$disconnect();
      } finally {
        process.exit(0);
      }
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start();