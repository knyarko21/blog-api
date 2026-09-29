
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard.jsx";
import { getUserFromToken } from "../utils/auth.js";

function PostDetails() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);

    const currentUser = getUserFromToken();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/posts/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Unable to load this story"
                    );
                }

                setPost(data.post);
            } catch (error) {
                console.error(
                    "FETCH POST ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load this story."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/posts"
                );

                const data = await response.json();

                if (!response.ok) {
                    return;
                }

                const otherPosts = (data.posts || [])
                    .filter(
                        (item) =>
                            Number(item.id) !== Number(id)
                    )
                    .slice(0, 3);

                setRelatedPosts(otherPosts);
            } catch (error) {
                console.error(
                    "FETCH RELATED POSTS ERROR:",
                    error
                );
            }
        };

        fetchRelatedPosts();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if (documentHeight <= 0) {
                setScrollProgress(0);
                return;
            }

            const progress =
                (scrollTop / documentHeight) * 100;

            setScrollProgress(
                Math.min(100, Math.max(0, progress))
            );
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white">
                <Navbar />

                <main className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:py-24">
                    <div className="animate-pulse">
                        <div className="h-4 w-32 rounded bg-white/10" />

                        <div className="mt-8 h-16 w-full rounded bg-white/10" />

                        <div className="mt-3 h-16 w-4/5 rounded bg-white/10" />

                        <div className="mt-8 h-5 w-64 rounded bg-white/10" />

                        <div className="mt-12 aspect-[16/9] rounded-[2rem] bg-white/5" />
                    </div>
                </main>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white">
                <Navbar />

                <main className="mx-auto max-w-3xl px-6 py-24 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                        Story unavailable
                    </p>

                    <h1 className="mt-5 text-4xl font-semibold tracking-tight">
                        We couldn't find that story.
                    </h1>

                    <p className="mt-4 text-white/40">
                        {error ||
                            "The story may have been removed or the link may be incorrect."}
                    </p>

                    <Link
                        to="/posts"
                        className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                    >
                        Back to Explore
                    </Link>
                </main>
            </div>
        );
    }

    const authorName = post.User
        ? `${post.User.firstName} ${post.User.lastName}`
        : "BlogHub Author";

    const username = post.User?.username
        ? `@${post.User.username}`
        : "@bloghub";

    const wordCount = post.content
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const readingTime = Math.max(
        1,
        Math.ceil(wordCount / 200)
    );

    const formattedDate = new Date(
        post.createdAt
    ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const isOwner =
        currentUser &&
        post &&
        Number(currentUser.id) ===
            Number(post.userId);

    const paragraphs = post.content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent">
                <div
                    className="h-full bg-white transition-[width] duration-100"
                    style={{
                        width: `${scrollProgress}%`
                    }}
                />
            </div>

            <Navbar />

            <main>
                <section className="border-b border-white/10">
                    <div className="mx-auto max-w-5xl px-6 pb-14 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                            <span>BlogHub Journal</span>

                            <span className="h-1 w-1 rounded-full bg-white/25" />

                            <span>
                                {readingTime} min read
                            </span>
                        </div>

                        <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                            {post.title}
                        </h1>

                        <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                                    {authorName
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        {authorName}
                                    </p>

                                    <p className="mt-1 text-xs text-white/35">
                                        {username}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-5">
                                <div className="text-sm text-white/35">
                                    {formattedDate}
                                </div>

                                {isOwner && (
                                    <Link
                                        to={`/edit-post/${post.id}`}
                                        className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/65 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                                    >
                                        Edit story
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pt-10 sm:px-8 lg:px-10 lg:pt-14">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
                        <div className="aspect-[16/8]">
                            {post.coverImage ? (
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/25">
                                        BlogHub
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-20">
                    <div className="mb-12 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/30">
                        <span>
                            {wordCount.toLocaleString()} words
                        </span>

                        <span className="h-1 w-1 rounded-full bg-white/20" />

                        <span>
                            {readingTime} min read
                        </span>
                    </div>

                    <div className="space-y-8">
                        {paragraphs.map(
                            (paragraph, index) => (
                                <p
                                    key={index}
                                    className={
                                        index === 0
                                            ? "text-xl leading-9 text-white/75 first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] sm:text-2xl sm:leading-10"
                                            : "text-base leading-8 text-white/65 sm:text-lg sm:leading-9"
                                    }
                                >
                                    {paragraph}
                                </p>
                            )
                        )}
                    </div>

                    <div className="mt-16 border-t border-white/10 pt-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold">
                                    Written by {authorName}
                                </p>

                                <p className="mt-1 text-sm text-white/35">
                                    Thanks for reading.
                                </p>
                            </div>

                            <Link
                                to="/posts"
                                className="inline-flex w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/65 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                            >
                                Explore more stories
                            </Link>
                        </div>
                    </div>
                </article>

                {relatedPosts.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
                            <div className="mb-10">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                                    Keep reading
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    More from BlogHub
                                </h2>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map(
                                    (relatedPost) => (
                                        <PostCard
                                            key={
                                                relatedPost.id
                                            }
                                            post={
                                                relatedPost
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <footer className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-white/35 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        BlogHub. Built for stories worth
                        sharing.
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

export default PostDetails;