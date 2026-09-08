
import User from '../models/userModel.js';

const findUserById = async (id) => {
    return await User.findByPk(id);
};

const findUserByUsername = async (username) => {
    return await User.findOne({
        where: {
            username
        }
    });
};

const findUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email
        }
    });
};

export {
    findUserById,
    findUserByUsername,
    findUserByEmail
};