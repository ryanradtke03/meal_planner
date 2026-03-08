export default function Landing() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-6xl font-black text-red-500">Meal Planner</h1>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <button>
          <a
            href="/Login"
            className="text-2xl font-bold text-blue-500 hover:underline"
          >
            Login
          </a>
        </button>
        <button>
          <a
            href="/Register"
            className="ml-4 text-2xl font-bold text-green-500 hover:underline"
          >
            Register
          </a>
        </button>
      </div>
    </main>
  );
}
