
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                    "Login failed."
                );

                return;
            }

            localStorage.setItem(
                "token",
                data.token
            );

            navigate("/dashboard");

        } catch (error) {
            console.error(
                "LOGIN ERROR:",
                error
            );

            setError(
                "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* LEFT SIDE */}

                <div className="hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-12 lg:flex lg:flex-col lg:justify-between">

                    <div>

                        <Link
                            to="/login"
                            className="text-2xl font-black tracking-tight"
                        >
                            BlogHub
                            <span className="text-blue-400">
                                .
                            </span>
                        </Link>

                        <div className="mt-32 max-w-lg">

                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                                The BlogHub Journal
                            </p>

                            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight">
                                Ideas worth reading.
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Discover stories, share your ideas,
                                and build your voice with BlogHub.
                            </p>

                        </div>

                    </div>

                    <p className="text-sm text-slate-500">
                        Write. Share. Inspire.
                    </p>

                </div>

                {/* RIGHT SIDE */}

                <div className="flex items-center justify-center px-6 py-12">

                    <div className="w-full max-w-md">

                        {/* MOBILE LOGO */}

                        <div className="mb-10 lg:hidden">

                            <Link
                                to="/login"
                                className="text-2xl font-black tracking-tight"
                            >
                                BlogHub
                                <span className="text-blue-500">
                                    .
                                </span>
                            </Link>

                        </div>

                        {/* HEADER */}

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                                Welcome back
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight">
                                Sign in to BlogHub
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Continue reading and managing
                                your stories.
                            </p>

                        </div>

                        {/* ERROR */}

                        {error && (
                            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        {/* LOGIN FORM */}

                        <form
                            onSubmit={handleLogin}
                            className="mt-8 space-y-5"
                        >

                            {/* EMAIL */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-slate-300"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                            </div>

                            {/* PASSWORD */}

                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-slate-300"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                            </div>

                            {/* SUBMIT */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}
                            </button>

                        </form>

                        {/* REGISTER */}

                        <p className="mt-8 text-center text-sm text-slate-500">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-semibold text-blue-400 transition hover:text-blue-300"
                            >
                                Create one
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;