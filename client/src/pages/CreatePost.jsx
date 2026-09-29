
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const wordCount = useMemo(() => {
        if (!content.trim()) {
            return 0;
        }

        return content
            .trim()
            .split(/\s+/)
            .length;
    }, [content]);

    const readingTime = Math.max(
        1,
        Math.ceil(wordCount / 200)
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!title.trim()) {
            setError("Please enter a title.");
            return;
        }

        if (!content.trim()) {
            setError("Please write some content.");
            return;
        }

        try {
            setLoading(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/posts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        content: content.trim(),
                        coverImage:
                            coverImage.trim()
                    })
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                setError(
                    data.error ||
                    "Unable to publish your story."
                );
                return;
            }

            navigate(
                `/posts/${data.post.id}`
            );

        } catch (error) {
            console.error(
                "CREATE POST ERROR:",
                error
            );

            setError(
                "Unable to connect to the Blog API."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* NAVBAR */}

            <Navbar />

            <main>

                {/* PAGE HEADER */}

                <section className="border-b border-slate-200 bg-white">

                    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                            New story
                        </p>

                        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            Share something worth reading.
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                            Write an idea, experience, lesson,
                            or perspective and share it with
                            the BlogHub community.
                        </p>

                    </div>

                </section>

                {/* EDITOR */}

                <section className="mx-auto max-w-5xl px-6 py-10 sm:py-14">

                    <form
                        onSubmit={handleSubmit}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                    >

                        {/* ERROR */}

                        {error && (
                            <div className="border-b border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* TITLE */}

                        <div className="border-b border-slate-200 px-6 py-7 sm:px-10 sm:py-9">

                            <label
                                htmlFor="title"
                                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                            >
                                Story title
                            </label>

                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                placeholder="Give your story a strong title..."
                                maxLength={200}
                                className="mt-4 w-full border-0 bg-transparent p-0 text-3xl font-black tracking-tight text-slate-950 outline-none placeholder:text-slate-300 focus:ring-0 sm:text-4xl"
                            />

                            <div className="mt-4 flex justify-between text-xs text-slate-400">

                                <span>
                                    Make it clear and memorable.
                                </span>

                                <span>
                                    {title.length}/200
                                </span>

                            </div>

                        </div>

                        {/* COVER IMAGE */}

                        <div className="border-b border-slate-200 px-6 py-7 sm:px-10">

                            <div className="flex flex-col gap-2">

                                <label
                                    htmlFor="coverImage"
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                                >
                                    Cover image
                                </label>

                                <p className="text-sm text-slate-500">
                                    Add a direct image URL to give
                                    your story a visual identity.
                                </p>

                            </div>

                            <input
                                id="coverImage"
                                type="url"
                                value={coverImage}
                                onChange={(event) =>
                                    setCoverImage(
                                        event.target.value
                                    )
                                }
                                placeholder="https://example.com/image.jpg"
                                className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                            />

                            {/* IMAGE PREVIEW */}

                            {coverImage.trim() && (
                                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">

                                    <img
                                        src={coverImage}
                                        alt="Cover preview"
                                        className="max-h-[420px] w-full object-cover"
                                        onError={(event) => {
                                            event.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                </div>
                            )}

                        </div>

                        {/* CONTENT */}

                        <div className="px-6 py-7 sm:px-10 sm:py-9">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <label
                                        htmlFor="content"
                                        className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                                    >
                                        Your story
                                    </label>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Separate paragraphs with a
                                        blank line.
                                    </p>

                                </div>

                                <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">

                                    <span>
                                        {wordCount} words
                                    </span>

                                    <span className="text-slate-300">
                                        •
                                    </span>

                                    <span>
                                        {readingTime} min read
                                    </span>

                                </div>

                            </div>

                            <textarea
                                id="content"
                                value={content}
                                onChange={(event) =>
                                    setContent(
                                        event.target.value
                                    )
                                }
                                placeholder="Start writing your story..."
                                rows={18}
                                className="mt-6 min-h-[420px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 text-base leading-8 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:text-lg"
                            />

                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">

                            <Link
                                to="/posts"
                                className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Publishing..."
                                    : "Publish story →"}
                            </button>

                        </div>

                    </form>

                </section>

            </main>

            {/* FOOTER */}

            <footer className="border-t border-slate-200 bg-white">

                <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="font-black tracking-tight text-slate-900">
                            BlogHub
                            <span className="text-blue-600">
                                .
                            </span>
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Write. Share. Inspire.
                        </p>

                    </div>

                    <Link
                        to="/posts"
                        className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                    >
                        Back to Explore →
                    </Link>

                </div>

            </footer>

        </div>
    );
}

export default CreatePost;