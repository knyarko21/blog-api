
import { Router } from "express";

import {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all posts
router.get(
    "/",
    getAllPosts
);


// ==========================================
// PROTECTED ROUTES
// ==========================================

// Get posts created by logged-in user
router.get(
    "/my-posts",
    authMiddleware,
    getMyPosts
);


// ==========================================
// POST CREATION
// ==========================================

router.post(
    "/",
    authMiddleware,
    createPost
);


// ==========================================
// SINGLE POST
// ==========================================

router.get(
    "/:id",
    getPostById
);


// ==========================================
// UPDATE
// ==========================================

router.put(
    "/:id",
    authMiddleware,
    updatePost
);


// ==========================================
// DELETE
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    deletePost
);


export default router;