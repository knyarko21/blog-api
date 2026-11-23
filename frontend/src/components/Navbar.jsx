
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setMenuOpen(false);
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/posts"
                    onClick={closeMenu}
                    className="text-xl font-black tracking-tight text-slate-900"
                >
                    BlogHub<span className="text-blue-600">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-7 md:flex">
                    <Link
                        to="/posts"
                        className={`text-sm font-semibold transition ${
                            isActive("/posts")
                                ? "text-blue-600"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Explore
                    </Link>

                    <Link
                        to="/my-posts"
                        className={`text-sm font-semibold transition ${
                            isActive("/my-posts")
                                ? "text-blue-600"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        My Stories
                    </Link>

                    <Link
                        to="/dashboard"
                        className={`text-sm font-semibold transition ${
                            isActive("/dashboard")
                                ? "text-blue-600"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Dashboard
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        to="/create-post"
                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                        Write a story
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="border-t border-slate-200 bg-white md:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">

                        <Link
                            to="/posts"
                            onClick={closeMenu}
                            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                isActive("/posts")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            Explore
                        </Link>

                        <Link
                            to="/my-posts"
                            onClick={closeMenu}
                            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                isActive("/my-posts")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            My Stories
                        </Link>

                        <Link
                            to="/dashboard"
                            onClick={closeMenu}
                            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                isActive("/dashboard")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            Dashboard
                        </Link>

                        {/* Mobile Write Button */}
                        <Link
                            to="/create-post"
                            onClick={closeMenu}
                            className="mt-2 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                        >
                            Write a story
                        </Link>

                        {/* Mobile Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;