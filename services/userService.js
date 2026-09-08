
import {
    findUserById,
    findUserByUsername,
    findUserByEmail
} from '../repositories/userRepository.js';


// Get user by ID
const getUserById = async (id) => {
    const user = await findUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};


// Get user by username
const getUserByUsername = async (username) => {
    const user = await findUserByUsername(username);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};


// Get user by email
const getUserByEmail = async (email) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};


export {
    getUserById,
    getUserByUsername,
    getUserByEmail
};