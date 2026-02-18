import { prisma } from "../src/db/prisma";

async function main() {
  console.log("Running seed script...");

  /**
   * TODO:
   * - Seed at least 3 demo recipes
   * - Optionally seed ingredients + relations
   * - Ensure idempotency (safe to re-run)
   */

  // Example placeholder:
  // await prisma.recipe.create({
  //   data: {
  //     title: "Example Recipe",
  //   },
  // });

  console.log("Seed complete (no data inserted yet).");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });