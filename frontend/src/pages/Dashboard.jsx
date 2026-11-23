
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard.jsx";
import { getUserFromToken } from "../utils/auth.js";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUser = getUserFromToken();

    useEffect(() => {
        const fetchMyPosts = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5000/api/posts/my-posts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        data.error || "Unable to load your stories"
                    );
                }

                setPosts(data.posts || []);

            } catch (error) {
                console.error(
                    "FETCH DASHBOARD POSTS ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Something went wrong while loading your stories."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, []);

    const totalWords = useMemo(() => {
        return posts.reduce((total, post) => {
            const words = post.content
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .length;

            return total + words;
        }, 0);
    }, [posts]);

    const averageReadingTime = useMemo(() => {
        if (posts.length === 0) {
            return 0;
        }

        const totalReadingTime = posts.reduce(
            (total, post) => {
                const words = post.content
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .length;

                const readingTime = Math.max(
                    1,
                    Math.ceil(words / 200)
                );

                return total + readingTime;
            },
            0
        );

        return Math.round(
            totalReadingTime / posts.length
        );
    }, [posts]);

    const recentPosts = posts.slice(0, 3);

    const firstName =
        currentUser?.firstName ||
        currentUser?.username ||
        "Writer";

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            <Navbar />

            <main>

                {/* =================================
                    DASHBOARD HERO
                ================================= */}

                <section className="border-b border-white/10">

                    <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">

                        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

                            <div className="max-w-3xl">

                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                                    Your workspace
                                </p>

                                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                                    Welcome back,{" "}
                                    <span className="text-white/45">
                                        {firstName}.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
                                    This is your BlogHub writing space.
                                    Create new ideas, manage your stories,
                                    and keep building your voice.
                                </p>

                            </div>


                            <Link
                                to="/create-post"
                                className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/85"
                            >
                                <span className="text-lg leading-none">
                                    +
                                </span>

                                Write a story
                            </Link>

                        </div>

                    </div>

                </section>


                {/* =================================
                    DASHBOARD CONTENT
                ================================= */}

                <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">

                    {/* =================================
                        STATS
                    ================================= */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                                Published stories
                            </p>

                            <p className="mt-4 text-4xl font-semibold tracking-tight">
                                {loading ? "—" : posts.length}
                            </p>

                            <p className="mt-2 text-sm text-white/35">
                                Stories in your journal
                            </p>

                        </div>


                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                                Words written
                            </p>

                            <p className="mt-4 text-4xl font-semibold tracking-tight">
                                {loading
                                    ? "—"
                                    : totalWords.toLocaleString()}
                            </p>

                            <p className="mt-2 text-sm text-white/35">
                                Across all your stories
                            </p>

                        </div>


                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                                Average reading time
                            </p>

                            <p className="mt-4 text-4xl font-semibold tracking-tight">
                                {loading
                                    ? "—"
                                    : `${averageReadingTime} min`}
                            </p>

                            <p className="mt-2 text-sm text-white/35">
                                Per published story
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        QUICK ACTIONS
                    ================================= */}

                    <section className="mt-16">

                        <div className="mb-8">

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                                Quick actions
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                Manage your BlogHub
                            </h2>

                        </div>


                        <div className="grid gap-4 md:grid-cols-3">

                            <Link
                                to="/posts"
                                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                            >

                                <div className="flex items-center justify-between">

                                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg">
                                        ↗
                                    </span>

                                    <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/50">
                                        →
                                    </span>

                                </div>

                                <h3 className="mt-7 text-xl font-semibold">
                                    Explore stories
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-white/40">
                                    Discover what other writers are
                                    publishing on BlogHub.
                                </p>

                            </Link>


                            <Link
                                to="/my-posts"
                                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                            >

                                <div className="flex items-center justify-between">

                                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg">
                                        ≡
                                    </span>

                                    <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/50">
                                        →
                                    </span>

                                </div>

                                <h3 className="mt-7 text-xl font-semibold">
                                    Manage my stories
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-white/40">
                                    Edit, read, or remove stories you've
                                    already published.
                                </p>

                            </Link>


                            <Link
                                to="/create-post"
                                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                            >

                                <div className="flex items-center justify-between">

                                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg text-black">
                                        +
                                    </span>

                                    <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/50">
                                        →
                                    </span>

                                </div>

                                <h3 className="mt-7 text-xl font-semibold">
                                    Start writing
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-white/40">
                                    Turn your next idea into a story
                                    worth sharing.
                                </p>

                            </Link>

                        </div>

                    </section>


                    {/* =================================
                        RECENT STORIES
                    ================================= */}

                    <section className="mt-20">

                        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                                    Your writing
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                    Recent stories
                                </h2>

                            </div>


                            {posts.length > 0 && (
                                <Link
                                    to="/my-posts"
                                    className="text-sm font-medium text-white/50 transition hover:text-white"
                                >
                                    View all stories →
                                </Link>
                            )}

                        </div>


                        {loading && (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                                    >

                                        <div className="aspect-[16/10] animate-pulse bg-white/5" />

                                        <div className="space-y-4 p-6">

                                            <div className="h-3 w-28 animate-pulse rounded bg-white/10" />

                                            <div className="h-6 w-full animate-pulse rounded bg-white/10" />

                                            <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />

                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}


                        {!loading && error && (
                            <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-8">

                                <p className="text-sm text-red-300">
                                    {error}
                                </p>

                            </div>
                        )}


                        {!loading && !error && recentPosts.length === 0 && (
                            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                                    +
                                </div>

                                <h3 className="mt-6 text-2xl font-semibold">
                                    Your journal is empty
                                </h3>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/40">
                                    Every writer starts with one idea.
                                    Turn yours into your first BlogHub
                                    story.
                                </p>

                                <Link
                                    to="/create-post"
                                    className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                                >
                                    Write your first story
                                </Link>

                            </div>
                        )}


                        {!loading && !error && recentPosts.length > 0 && (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                                {recentPosts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                    />
                                ))}

                            </div>
                        )}

                    </section>


                    {/* =================================
                        WRITING CTA
                    ================================= */}

                    {!loading && posts.length > 0 && (
                        <section className="mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">

                            <div className="relative px-7 py-12 sm:px-10 sm:py-16 lg:px-14">

                                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

                                <div className="relative max-w-2xl">

                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                                        Keep writing
                                    </p>

                                    <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                        Your next story could start
                                        with one idea.
                                    </h2>

                                    <p className="mt-5 text-base leading-8 text-white/45">
                                        You already have a place to publish.
                                        Now give your next idea a voice.
                                    </p>

                                    <Link
                                        to="/create-post"
                                        className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/85"
                                    >
                                        Write a new story →
                                    </Link>

                                </div>

                            </div>

                        </section>
                    )}

                </section>

            </main>


            {/* =================================
                FOOTER
            ================================= */}

            <footer className="border-t border-white/10">

                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-white/35 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

                    <p>
                        © {new Date().getFullYear()} BlogHub.
                        Built for stories worth sharing.
                    </p>

                    <Link
                        to="/create-post"
                        className="text-white/60 transition hover:text-white"
                    >
                        Write a story →
                    </Link>

                </div>

            </footer>

        </div>
    );
}

export default Dashboard;