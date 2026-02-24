import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log(data);


            if (!res.ok) {
                throw new Error(data.message || "Login Failed!")
            }

            // Success -> redirect to main page
            navigate("/dashboard");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="min-h-screen flex flex-col items-center bg-white pt-8">
            <div className="w-[410px] bg-white border border-gray-300 rounded shadow-md px-6 pt-6 pb-5">
                <h1 className="text-4xl font-bold text-center mb-5 text-black">
                    Log in
                </h1>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 px-4 text-lg border border-gray-300 rounded outline-none
                       focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 px-4 text-lg border border-gray-300 rounded outline-none
                       focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-13 py-3 bg-blue-600 text-white text-lg font-bold
                       rounded hover:bg-blue-700 active:bg-blue-800 transition"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 text-sm text-gray-800 select-none">
                            <input type="checkbox" className="w-4 h-4" />
                            Remember me
                        </label>

                        <a
                            href="#"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>

            <a
                href="#"
                className="mt-6 text-blue-600 hover:underline text-base"
                onClick={(e) => { e.preventDefault(); navigate("/register") }}
            >
                Create an Account

            </a>
        </div>
    );
}