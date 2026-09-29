
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const createPost = async (data) => {
    return await Post.create(data);
};

export const findAllPosts = async () => {
    return await Post.findAll({
        include: [
            {
                model: User,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "username"
                ]
            }
        ],
        order: [
            ["createdAt", "DESC"]
        ]
    });
};

export const findPostsByUserId = async (userId) => {
    return await Post.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "username"
                ]
            }
        ],
        order: [
            ["createdAt", "DESC"]
        ]
    });
};

export const findPostById = async (id) => {
    return await Post.findByPk(id, {
        include: [
            {
                model: User,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "username"
                ]
            }
        ]
    });
};

export const updatePost = async (id, data) => {
    const post = await Post.findByPk(id);

    if (!post) {
        return null;
    }

    await post.update(data);

    return await Post.findByPk(id, {
        include: [
            {
                model: User,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "username"
                ]
            }
        ]
    });
};

export const deletePost = async (id) => {
    const post = await Post.findByPk(id);

    if (!post) {
        return null;
    }

    await post.destroy();

    return post;
};