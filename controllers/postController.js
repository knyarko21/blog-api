
import {
    createNewPost,
    getAllPosts as getAllPostsService,
    getPostsByUserId as getPostsByUserIdService,
    getPostById as getPostByIdService,
    updateExistingPost,
    deleteExistingPost
} from "../services/postService.js";

import {
    createPostSchema,
    updatePostSchema
} from "../schemas/postSchema.js";


// ==========================================
// CREATE POST
// ==========================================

export const createPost = async (req, res) => {

    const result = await createPostSchema.safeParseAsync(req.body);

    if (!result.success) {

        return res.status(400).json({
            error: result.error.message
        });
    }

    try {

        const userId = req.user.id;

        const post = await createNewPost({

            title: result.data.title,

            content: result.data.content,

            coverImage: result.data.coverImage || null,

            userId: userId
        });

        return res.status(201).json({

            message: "Post created successfully",

            post: post
        });

    } catch (error) {

        console.error(
            "CREATE POST ERROR:",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
};


// ==========================================
// GET ALL POSTS
// ==========================================

export const getAllPosts = async (req, res) => {

    try {

        const posts = await getAllPostsService();

        return res.status(200).json({
            posts: posts
        });

    } catch (error) {

        console.error(
            "GET ALL POSTS ERROR:",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
};


// ==========================================
// GET MY POSTS
// ==========================================

export const getMyPosts = async (req, res) => {

    try {

        // authMiddleware already verified
        // the user's JWT.
        const userId = req.user.id;

        const posts = await getPostsByUserIdService(
            userId
        );

        return res.status(200).json({
            posts: posts
        });

    } catch (error) {

        console.error(
            "GET MY POSTS ERROR:",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
};


// ==========================================
// GET POST BY ID
// ==========================================

export const getPostById = async (req, res) => {

    try {

        const id = req.params.id;

        const post = await getPostByIdService(id);

        if (!post) {

            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json({
            post: post
        });

    } catch (error) {

        console.error(
            "GET POST ERROR:",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
};


// ==========================================
// UPDATE POST
// ==========================================

export const updatePost = async (req, res) => {

    const result = await updatePostSchema.safeParseAsync(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            error: result.error.message
        });
    }

    try {

        const id = req.params.id;

        const userId = req.user.id;

        const post = await getPostByIdService(id);

        if (!post) {

            return res.status(404).json({
                error: "Post not found"
            });
        }

        // Only the owner can update the post.
        if (post.userId !== userId) {

            return res.status(403).json({
                error: "You are not allowed to update this post"
            });
        }

        const updatedPost = await updateExistingPost(

            id,

            {
                title: result.data.title,

                content: result.data.content,

                coverImage: result.data.coverImage || null
            }
        );

        return res.status(200).json({

            message: "Post updated successfully",

            post: updatedPost
        });

    } catch (error) {

        console.error(
            "UPDATE POST ERROR:",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
};


// ==========================================
// DELETE POST
// ==========================================

export const deletePost = async (req, res) => {

    try {

        const id = req.params.id;

        const userId = req.user.id;

        const post = await getPostByIdService(id);

        if (!post) {

            return res.status(404).json({
                error: "Post not found"
            });
        }

        // Only the owner can delete the post.
        if (post.userId !== userId) {

            return res.status(403).json({
                error: "You are not allowed to delete this post"
            });
        }

        await deleteExistingPost(id);

        return res.status(200).json({

            message: "Post deleted successfully"
        });

    } catch (error) {

        console.error(
            "DELETE POST ERROR:",
            error
        );

        return res.status(500).json({
            error: error.message
        });
    }
};