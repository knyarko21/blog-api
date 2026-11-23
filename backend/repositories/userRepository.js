
import User from "../models/userModel.js";


// Find user by username
export const findUserByUsername = async (username) => {
    return await User.findOne({
        where: {
            username: username
        }
    });
};


// Find user by email
export const findUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    });
};


// Create new user
export const createUser = async (data) => {
    return await User.create(data);
};