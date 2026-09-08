
import {
    getUserById,
    getUserByUsername,
    getUserByEmail
} from '../services/userService.js';


// Get user by ID
const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);

        return res.status(200).json({
            message: 'User found successfully',
            user
        });

    } catch (error) {
        console.error('Error finding user by ID:', error);

        return res.status(404).json({
            message: error.message
        });
    }
};


// Get user by username
const getUserByUsernameController = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await getUserByUsername(username);

        return res.status(200).json({
            message: 'User found successfully',
            user
        });

    } catch (error) {
        console.error('Error finding user by username:', error);

        return res.status(404).json({
            message: error.message
        });
    }
};


// Get user by email
const getUserByEmailController = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await getUserByEmail(email);

        return res.status(200).json({
            message: 'User found successfully',
            user
        });

    } catch (error) {
        console.error('Error finding user by email:', error);

        return res.status(404).json({
            message: error.message
        });
    }
};


export {
    getUserByIdController,
    getUserByUsernameController,
    getUserByEmailController
};