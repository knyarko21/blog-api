
import * as zod from "zod";

export const createPostSchema = zod.object({
    title: zod
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),

    content: zod
        .string()
        .trim()
        .min(1, "Content is required"),

    coverImage: zod
        .string()
        .trim()
        .url("Cover image must be a valid URL")
        .optional()
        .or(zod.literal(""))
});

export const updatePostSchema = zod.object({
    title: zod
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),

    content: zod
        .string()
        .trim()
        .min(1, "Content is required"),

    coverImage: zod
        .string()
        .trim()
        .url("Cover image must be a valid URL")
        .optional()
        .or(zod.literal(""))
});