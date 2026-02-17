export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-6xl font-black text-red-500">Meal Planner</h1>

      <p className="mt-2 text-zinc-300">
        React + TypeScript + Tailwind + Routing is working.
      </p>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <p className="font-semibold">MEA 3 Done ✅</p>
        <p className="text-sm text-zinc-300 mt-1">
          If this looks styled, Tailwind is active.
        </p>
      </div>
    </main>
  );
}
