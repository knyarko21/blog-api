
import express from 'express';

import {
    getUserByIdController,
    getUserByUsernameController,
    getUserByEmailController
} from '../controllers/userController.js';

const router = express.Router();


// GET user by ID
router.get('/id/:id', getUserByIdController);


// GET user by username
router.get('/username/:username', getUserByUsernameController);


// GET user by email
router.get('/email/:email', getUserByEmailController);


export default router;