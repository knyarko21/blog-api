
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    findUserByUsername,
    findUserByEmail,
    createUser
} from "../repositories/userRepository.js";


// Register user
export const registerUser = async (data) => {

    // Check if username already exists
    const existingUsername = await findUserByUsername(data.username);

    if (existingUsername) {
        throw new Error("Username already exists");
    }


    // Check if email already exists
    const existingEmail = await findUserByEmail(data.email);

    if (existingEmail) {
        throw new Error("Email already exists");
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);


    // Create user
    const createdUser = await createUser({
        ...data,
        password: hashedPassword
    });


    // Remove password from returned object
    const user = createdUser.toJSON();

    delete user.password;


    return user;
};


// Login user
export const loginUser = async (data) => {

    // Find user by email
    const user = await findUserByEmail(data.email);

    if (!user) {
        throw new Error("Invalid email or password");
    }


    // Compare password
    const passwordMatch = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }


    // Create JWT token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );


    return {
        token
    };
};