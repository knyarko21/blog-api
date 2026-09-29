
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !username.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        username: username.trim(),
                        email: email.trim(),
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                    "Registration failed."
                );

                return;
            }

            setSuccess(
                "Account created successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {
            console.error(
                "REGISTER ERROR:",
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

                <div className="hidden bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">

                    <div>

                        <Link
                            to="/login"
                            className="text-2xl font-black tracking-tight"
                        >
                            BlogHub
                            <span className="text-blue-300">
                                .
                            </span>
                        </Link>

                        <div className="mt-32 max-w-lg">

                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                                Join BlogHub
                            </p>

                            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight">
                                Your ideas deserve a place to live.
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-blue-100/80">
                                Create your account, publish your
                                stories, and build your own space
                                on BlogHub.
                            </p>

                        </div>

                    </div>

                    <p className="text-sm text-blue-200/60">
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
                                Create account
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight">
                                Welcome to BlogHub
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Create your account and start
                                publishing your own stories.
                            </p>

                        </div>

                        {/* ERROR MESSAGE */}

                        {error && (
                            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        {/* SUCCESS MESSAGE */}

                        {success && (
                            <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                                {success}
                            </div>
                        )}

                        {/* REGISTRATION FORM */}

                        <form
                            onSubmit={handleRegister}
                            className="mt-8 space-y-5"
                        >

                            {/* FIRST AND LAST NAME */}

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                <div>

                                    <label
                                        htmlFor="firstName"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        First name
                                    </label>

                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(event) =>
                                            setFirstName(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Kelly"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                                <div>

                                    <label
                                        htmlFor="lastName"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Last name
                                    </label>

                                    <input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(event) =>
                                            setLastName(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Nyarko"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                            </div>

                            {/* USERNAME */}

                            <div>

                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-medium text-slate-300"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(
                                            event.target.value
                                        )
                                    }
                                    placeholder="kelly"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                            </div>

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
                                    placeholder="Create a password"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    Choose a password you will
                                    remember. Do not share it.
                                </p>

                            </div>

                            {/* SUBMIT BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create account"}
                            </button>

                        </form>

                        {/* LOGIN LINK */}

                        <p className="mt-8 text-center text-sm text-slate-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-blue-400 transition hover:text-blue-300"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;