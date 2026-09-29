
import * as zod from "zod";


// ===============================
// Create user schema
// ===============================

export const createUserSchema = zod.object({

    firstName: zod
        .string()
        .trim()
        .min(1, "First name is required"),

    lastName: zod
        .string()
        .trim()
        .min(1, "Last name is required"),

    email: zod
        .string()
        .trim()
        .email("Invalid email"),

    password: zod
        .string({
            error: "Password is required"
        })
        .min(6, "Password must be at least 6 characters"),

    username: zod
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")

});


// ===============================
// Login user schema
// ===============================

export const logInUserSchema = zod.object({

    email: zod
        .string()
        .trim()
        .email("Invalid email"),

    password: zod
        .string()
        .trim()
        .min(1, "Password is required")

});