
import {
    createPost,
    findAllPosts,
    findPostsByUserId,
    findPostById,
    updatePost,
    deletePost
} from "../repositories/postRepository.js";


// Create a new post
export const createNewPost = async (data) => {

    const post = await createPost(data);

    return post;
};


// Get all posts
export const getAllPosts = async () => {

    const posts = await findAllPosts();

    return posts;
};


// Get posts belonging to one user
export const getPostsByUserId = async (userId) => {

    const posts = await findPostsByUserId(userId);

    return posts;
};


// Get one post by ID
export const getPostById = async (id) => {

    const post = await findPostById(id);

    return post;
};


// Update an existing post
export const updateExistingPost = async (id, data) => {

    const post = await updatePost(id, data);

    return post;
};


// Delete an existing post
export const deleteExistingPost = async (id) => {

    const post = await deletePost(id);

    return post;
};