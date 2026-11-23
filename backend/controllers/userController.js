
import {
    registerUser,
    loginUser
} from "../services/userService.js";

import {
    createUserSchema,
    logInUserSchema
} from "../schemas/userSchema.js";


// Register user
export const register = async (req, res) => {

    const result = await createUserSchema.safeParseAsync(req.body);

    console.log("method:", req.method);

    if (!result.success) {

        console.log(result.error);

        return res.status(400).json({
            error: result.error.message
        });
    }

    try {

        const createdUser = await registerUser(result.data);

        return res.status(201).json({
            createdUser
        });

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });
    }
};


// Login user
export const login = async (req, res) => {

    const result = await logInUserSchema.safeParseAsync(req.body);

    console.log("method:", req.method);

    if (!result.success) {

        console.log(result.error);

        return res.status(400).json({
            error: result.error.message
        });
    }

    try {

        const resultData = await loginUser(result.data);

        return res.status(200).json({
            message: "Login successful",
            ...resultData
        });

    } catch (err) {

        return res.status(401).json({
            error: err.message
        });
    }
};


// Get authenticated user's profile
export const profile = async (req, res) => {

    return res.status(200).json({
        message: "Authenticated successfully",
        user: req.user
    });
};


// Logout user
export const logout = async (req, res) => {

    return res.status(200).json({
        message: "Logout successful"
    });
};