
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard.jsx";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/posts"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Unable to load stories"
                    );
                }

                setPosts(data.posts || []);

            } catch (error) {
                console.error("FETCH POSTS ERROR:", error);

                setError(
                    error.message ||
                    "Something went wrong while loading stories."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const featuredPost = posts[0];
    const latestPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            <Navbar />

            <main>

                {/* ================================
                    HERO SECTION
                ================================= */}

                <section className="border-b border-white/10">

                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">

                        <div className="max-w-4xl">

                            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                                The BlogHub Journal
                            </p>

                            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
                                Ideas worth
                                <span className="block text-white/40">
                                    reading.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                                Stories, ideas and perspectives about
                                technology, business, creativity and the
                                changing world around us.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================================
                    CONTENT
                ================================= */}

                <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">

                    {loading && (
                        <div className="space-y-16">

                            {/* Featured skeleton */}

                            <div className="grid gap-10 lg:grid-cols-2">

                                <div className="aspect-[16/10] animate-pulse rounded-3xl bg-white/5" />

                                <div className="flex flex-col justify-center">

                                    <div className="h-4 w-32 animate-pulse rounded bg-white/10" />

                                    <div className="mt-6 h-12 w-full animate-pulse rounded bg-white/10" />

                                    <div className="mt-3 h-12 w-4/5 animate-pulse rounded bg-white/10" />

                                    <div className="mt-8 h-5 w-full animate-pulse rounded bg-white/10" />

                                    <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-white/10" />

                                </div>

                            </div>


                            {/* Cards skeleton */}

                            <div>

                                <div className="mb-8 h-8 w-40 animate-pulse rounded bg-white/10" />

                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                                        >

                                            <div className="aspect-[16/10] animate-pulse bg-white/5" />

                                            <div className="space-y-4 p-6">

                                                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />

                                                <div className="h-6 w-full animate-pulse rounded bg-white/10" />

                                                <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>
                    )}


                    {!loading && error && (
                        <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-8 text-center">

                            <p className="text-sm text-red-300">
                                {error}
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="mt-5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                            >
                                Try again
                            </button>

                        </div>
                    )}


                    {!loading && !error && posts.length === 0 && (
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                                No stories yet
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                                The journal is waiting for its first story.
                            </h2>

                            <p className="mx-auto mt-4 max-w-lg leading-7 text-white/50">
                                Start writing and your story will appear
                                here for readers to discover.
                            </p>

                            <Link
                                to="/create-post"
                                className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                            >
                                Write a story
                            </Link>

                        </div>
                    )}


                    {!loading && !error && featuredPost && (
                        <div className="space-y-20">

                            {/* ================================
                                FEATURED STORY
                            ================================= */}

                            <section>

                                <div className="mb-8 flex items-center justify-between">

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                                            Featured story
                                        </p>

                                        <div className="mt-3 h-px w-12 bg-white/30" />
                                    </div>

                                </div>


                                <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">

                                    <div className="grid lg:grid-cols-2">

                                        {/* Image */}

                                        <Link
                                            to={`/posts/${featuredPost.id}`}
                                            className="relative block overflow-hidden"
                                        >

                                            <div className="aspect-[16/11] bg-gradient-to-br from-white/10 via-white/5 to-transparent">

                                                {featuredPost.coverImage ? (
                                                    <img
                                                        src={featuredPost.coverImage}
                                                        alt={featuredPost.title}
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">

                                                        <span className="text-sm uppercase tracking-[0.25em] text-white/30">
                                                            BlogHub
                                                        </span>

                                                    </div>
                                                )}

                                            </div>

                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                        </Link>


                                        {/* Content */}

                                        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">

                                            <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">

                                                <span>
                                                    {featuredPost.User
                                                        ? `${featuredPost.User.firstName} ${featuredPost.User.lastName}`
                                                        : "BlogHub Author"}
                                                </span>

                                                <span className="h-1 w-1 rounded-full bg-white/30" />

                                                <span>
                                                    {Math.max(
                                                        1,
                                                        Math.ceil(
                                                            featuredPost.content
                                                                .trim()
                                                                .split(/\s+/)
                                                                .filter(Boolean)
                                                                .length / 200
                                                        )
                                                    )} min read
                                                </span>

                                            </div>


                                            <Link
                                                to={`/posts/${featuredPost.id}`}
                                            >

                                                <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] transition group-hover:text-white/70 sm:text-4xl lg:text-5xl">
                                                    {featuredPost.title}
                                                </h2>

                                            </Link>


                                            <p className="mt-6 line-clamp-4 text-base leading-8 text-white/50">
                                                {featuredPost.content}
                                            </p>


                                            <div className="mt-8 flex flex-wrap items-center gap-5">

                                                <Link
                                                    to={`/posts/${featuredPost.id}`}
                                                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                                                >
                                                    Read story
                                                </Link>

                                                <span className="text-sm text-white/35">
                                                    {new Date(
                                                        featuredPost.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric"
                                                        }
                                                    )}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </article>

                            </section>


                            {/* ================================
                                LATEST STORIES
                            ================================= */}

                            {latestPosts.length > 0 && (
                                <section>

                                    <div className="mb-10 flex items-end justify-between gap-6">

                                        <div>

                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                                                The latest
                                            </p>

                                            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                                More stories
                                            </h2>

                                        </div>

                                        <span className="hidden text-sm text-white/35 sm:block">
                                            {latestPosts.length}{" "}
                                            {latestPosts.length === 1
                                                ? "story"
                                                : "stories"}
                                        </span>

                                    </div>


                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                                        {latestPosts.map((post) => (
                                            <PostCard
                                                key={post.id}
                                                post={post}
                                            />
                                        ))}

                                    </div>

                                </section>
                            )}

                        </div>
                    )}

                </section>

            </main>


            {/* ================================
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

export default Posts;