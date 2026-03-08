import { useEffect, useState } from "react";
import type { RecipeListItem } from "../types/recipies";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    console.log("Recipes state updated:", recipes);
  }, [recipes]);

  async function fetchRecipes() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recipies/list`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch recipes!");
      }

      const data: RecipeListItem[] = await res.json();

      setRecipes(data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-500">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="text-4xl font-bold text-center mb-5 text-white">
        Welcome to Meal Planner!
      </div>
      <div>
        <p className="text-lg text-center">
          Plan your meals, track your ingredients, and cook delicious dishes!
        </p>

        {loading && <div className="text-center mt-4">Loading...</div>}
      </div>
    </main>
  );
}
