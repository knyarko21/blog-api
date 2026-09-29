
import { Link } from "react-router-dom";

function PostCard({
    post,
    showActions = false,
    onDelete
}) {
    const readingTime = Math.max(
        1,
        Math.ceil(
            post.content
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .length / 200
        )
    );

    const excerpt =
        post.content.length > 150
            ? `${post.content.slice(0, 150).trim()}...`
            : post.content;

    const authorName = post.User
        ? `${post.User.firstName} ${post.User.lastName}`
        : "BlogHub Author";

    const formattedDate = new Date(
        post.createdAt
    ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">

            {/* ================================
                COVER IMAGE
            ================================= */}

            <Link
                to={`/posts/${post.id}`}
                className="relative block overflow-hidden"
            >

                <div className="aspect-[16/10] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">

                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">

                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/25">
                                BlogHub
                            </span>

                        </div>
                    )}

                </div>


                {/* Image overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />


                {/* Reading time */}

                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                    {readingTime} min read
                </div>

            </Link>


            {/* ================================
                CARD CONTENT
            ================================= */}

            <div className="flex flex-1 flex-col p-6">

                {/* Author + Date */}

                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/35">

                    <span>
                        {authorName}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-white/20" />

                    <span>
                        {formattedDate}
                    </span>

                </div>


                {/* Title */}

                <Link
                    to={`/posts/${post.id}`}
                    className="mt-4 block"
                >

                    <h2 className="text-xl font-semibold leading-tight tracking-[-0.02em] text-white transition duration-300 group-hover:text-white/65 sm:text-2xl">
                        {post.title}
                    </h2>

                </Link>


                {/* Excerpt */}

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/45">
                    {excerpt}
                </p>


                {/* Bottom section */}

                <div className="mt-auto pt-7">

                    {!showActions ? (
                        <Link
                            to={`/posts/${post.id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
                        >
                            Read story
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    ) : (
                        <div className="flex flex-wrap items-center gap-3">

                            <Link
                                to={`/posts/${post.id}`}
                                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                            >
                                Read
                            </Link>

                            <Link
                                to={`/edit-post/${post.id}`}
                                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                            >
                                Edit
                            </Link>

                            <button
                                type="button"
                                onClick={() => onDelete(post.id)}
                                className="rounded-full border border-red-400/10 px-4 py-2 text-xs font-semibold text-red-300/70 transition hover:border-red-400/25 hover:bg-red-400/5 hover:text-red-300"
                            >
                                Delete
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </article>
    );
}

export default PostCard;