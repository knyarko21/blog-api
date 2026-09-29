
import { useEffect, useMemo, useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    `http://localhost:5000/api/posts/${id}`
                );

                const data = await response.json();

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                if (response.status === 404) {
                    setError("Story not found.");
                    return;
                }

                if (!response.ok) {
                    setError(
                        data.error ||
                        "Unable to load this story."
                    );
                    return;
                }

                const post = data.post;

                setTitle(post.title || "");
                setContent(post.content || "");
                setCoverImage(
                    post.coverImage || ""
                );

            } catch (error) {
                console.error(
                    "GET EDIT POST ERROR:",
                    error
                );

                setError(
                    "Unable to connect to the Blog API."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);

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
            setSaving(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/posts/${id}`,
                {
                    method: "PUT",
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

            if (response.status === 403) {
                setError(
                    "You are not allowed to edit this story."
                );
                return;
            }

            if (response.status === 404) {
                setError("Story not found.");
                return;
            }

            if (!response.ok) {
                setError(
                    data.error ||
                    "Unable to update your story."
                );
                return;
            }

            navigate(`/posts/${id}`);

        } catch (error) {
            console.error(
                "UPDATE POST ERROR:",
                error
            );

            setError(
                "Unable to connect to the Blog API."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">

                <Navbar />

                <main className="mx-auto max-w-5xl px-6 py-16">

                    <div className="animate-pulse">

                        <div className="h-4 w-28 rounded bg-slate-200" />

                        <div className="mt-6 h-12 max-w-3xl rounded bg-slate-200" />

                        <div className="mt-4 h-5 max-w-xl rounded bg-slate-200" />

                        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">

                            <div className="h-32 border-b border-slate-200 bg-slate-100" />

                            <div className="h-32 border-b border-slate-200 bg-slate-100" />

                            <div className="h-[450px] bg-slate-100" />

                        </div>

                    </div>

                </main>

            </div>
        );
    }

    if (error && !title && !content) {
        return (
            <div className="min-h-screen bg-slate-50">

                <Navbar />

                <main className="mx-auto max-w-5xl px-6 py-24">

                    <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-xl text-red-600">
                            !
                        </div>

                        <h1 className="mt-6 text-2xl font-black text-slate-900">
                            {error}
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                            We couldn't load this story for
                            editing.
                        </p>

                        <Link
                            to="/posts"
                            className="mt-7 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                        >
                            Back to Explore
                        </Link>

                    </div>

                </main>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            <Navbar />

            <main>

                {/* PAGE HEADER */}

                <section className="border-b border-slate-200 bg-white">

                    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                            Edit story
                        </p>

                        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            Refine your story.
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                            Update your title, cover image,
                            or article content before saving
                            your changes.
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
                                maxLength={200}
                                className="mt-4 w-full border-0 bg-transparent p-0 text-3xl font-black tracking-tight text-slate-950 outline-none placeholder:text-slate-300 focus:ring-0 sm:text-4xl"
                            />

                            <div className="mt-4 flex justify-between text-xs text-slate-400">

                                <span>
                                    Keep your title clear and memorable.
                                </span>

                                <span>
                                    {title.length}/200
                                </span>

                            </div>

                        </div>

                        {/* COVER IMAGE */}

                        <div className="border-b border-slate-200 px-6 py-7 sm:px-10">

                            <label
                                htmlFor="coverImage"
                                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                            >
                                Cover image
                            </label>

                            <p className="mt-2 text-sm text-slate-500">
                                Change the image used for your
                                story.
                            </p>

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

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <label
                                        htmlFor="content"
                                        className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                                    >
                                        Your story
                                    </label>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Edit your article content below.
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
                                rows={18}
                                className="mt-6 min-h-[420px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 text-base leading-8 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:text-lg"
                            />

                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">

                            <Link
                                to={`/posts/${id}`}
                                className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving
                                    ? "Saving changes..."
                                    : "Save changes →"}
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
                            Write. Refine. Publish.
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

export default EditPost;