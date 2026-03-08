import { useEffect, useState } from "react";
import { RecipeModal } from "../components/RecipieModal";
import type { Recipe, RecipeListItem } from "../types/recipies";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    console.log("Recipes state updated:", recipes);
  }, [recipes]);

  async function fetchRecipieInfo(recipeId: string) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/recipies/${recipeId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch recipe info!");
      }

      const data: Recipe = await res.json();
      setSelectedRecipe(data);
      console.log("Selected Recipe:", data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

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

        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <button
              key={recipe.id}
              className="w-full text-left"
              onClick={(e) => {
                e.preventDefault();
                fetchRecipieInfo(recipe.id);
              }}
            >
              <div
                key={recipe.id}
                className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <h2 className="text-2xl font-bold text-red-500">
                  {recipe.title}
                </h2>
                {recipe.description && (
                  <p className="mt-2 text-gray-400">{recipe.description}</p>
                )}
              </div>
            </button>
          ))}
      </div>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </main>
  );
}
