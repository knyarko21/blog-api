
import { Router } from "express";

import {
    register,
    login,
    profile,
    logout
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = Router();


// Register
router.post("/register", register);


// Login
router.post("/login", login);


// Protected profile route
router.get(
    "/profile",
    authMiddleware,
    profile
);


// Logout
router.post(
    "/logout",
    authMiddleware,
    logout
);


export default router;