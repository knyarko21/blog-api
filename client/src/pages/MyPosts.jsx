
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard.jsx";
import { getUserFromToken } from "../utils/auth.js";

function MyPosts() {
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
                    "FETCH MY POSTS ERROR:",
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

    const handleDelete = async (postId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this story? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}`,
                {
                    method: "DELETE",
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

            if (response.status === 403) {
                alert(
                    data.error ||
                    "You are not allowed to delete this story."
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to delete story"
                );
            }

            setPosts((currentPosts) =>
                currentPosts.filter(
                    (post) => post.id !== postId
                )
            );

        } catch (error) {
            console.error(
                "DELETE POST ERROR:",
                error
            );

            alert(
                error.message ||
                "Something went wrong while deleting the story."
            );
        }
    };

    const firstName =
        currentUser?.firstName ||
        currentUser?.username ||
        "Writer";

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            <Navbar />

            <main>

                {/* =================================
                    PAGE HEADER
                ================================= */}

                <section className="border-b border-white/10">

                    <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">

                        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                                    Your journal
                                </p>

                                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                                    Your stories
                                </h1>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
                                    Everything you've published on
                                    BlogHub, all in one place.
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
                    CONTENT
                ================================= */}

                <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">

                    {/* =================================
                        AUTHOR SUMMARY
                    ================================= */}

                    <div className="mb-14 grid gap-4 sm:grid-cols-2">

                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-black">
                                    {firstName
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>

                                    <p className="text-sm font-semibold">
                                        {currentUser?.firstName &&
                                        currentUser?.lastName
                                            ? `${currentUser.firstName} ${currentUser.lastName}`
                                            : firstName}
                                    </p>

                                    <p className="mt-1 text-xs text-white/35">
                                        @{currentUser?.username || "writer"}
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="grid grid-cols-2 rounded-3xl border border-white/10 bg-white/[0.03]">

                            <div className="border-r border-white/10 p-6">

                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                                    Published
                                </p>

                                <p className="mt-3 text-3xl font-semibold">
                                    {loading ? "—" : posts.length}
                                </p>

                            </div>


                            <div className="p-6">

                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                                    Words
                                </p>

                                <p className="mt-3 text-3xl font-semibold">
                                    {loading
                                        ? "—"
                                        : totalWords.toLocaleString()}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        SECTION HEADER
                    ================================= */}

                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                                Published writing
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                Your stories
                            </h2>

                        </div>

                        {!loading && posts.length > 0 && (
                            <p className="text-sm text-white/35">
                                {posts.length}{" "}
                                {posts.length === 1
                                    ? "published story"
                                    : "published stories"}
                            </p>
                        )}

                    </div>


                    {/* =================================
                        LOADING
                    ================================= */}

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

                                        <div className="h-8 w-32 animate-pulse rounded-full bg-white/10" />

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}


                    {/* =================================
                        ERROR
                    ================================= */}

                    {!loading && error && (
                        <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-8">

                            <p className="text-sm text-red-300">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    window.location.reload()
                                }
                                className="mt-5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                            >
                                Try again
                            </button>

                        </div>
                    )}


                    {/* =================================
                        EMPTY STATE
                    ================================= */}

                    {!loading &&
                        !error &&
                        posts.length === 0 && (
                            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-2xl">
                                    +
                                </div>

                                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                                    Start your journal
                                </p>

                                <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                                    You haven't published a story yet.
                                </h2>

                                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/40">
                                    Your first story doesn't need to be
                                    perfect. It just needs to exist.
                                </p>

                                <Link
                                    to="/create-post"
                                    className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/85"
                                >
                                    Write your first story
                                </Link>

                            </div>
                        )}


                    {/* =================================
                        STORIES
                    ================================= */}

                    {!loading &&
                        !error &&
                        posts.length > 0 && (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                                {posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        showActions={true}
                                        onDelete={handleDelete}
                                    />
                                ))}

                            </div>
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

export default MyPosts;