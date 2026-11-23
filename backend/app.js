

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./database/dbConnection.js";

// Import associations
import "./models/index.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT || 5000);

// ===============================
// Environment validation
// ===============================

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from environment variables.");
}

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be a valid port number.");
}

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Home route
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Blog API is running",
        environment: NODE_ENV
    });
});

// ===============================
// API routes
// ===============================

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// ===============================
// Start server
// ===============================

const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();

        console.log(
            "Database connection established successfully."
        );

        // Development database synchronization
        if (NODE_ENV === "development") {
            await sequelize.sync();

            console.log(
                "Database synchronized successfully."
            );
        } else {
            console.log(
                "Production mode: automatic database synchronization disabled."
            );
        }

        // Start Express server
        app.listen(PORT, () => {
            console.log(
                `Blog API running on port ${PORT}`
            );

            console.log(
                `Environment: ${NODE_ENV}`
            );
        });

    } catch (error) {
        console.error(
            "Unable to start the Blog API:",
            error.message
        );

        process.exitCode = 1;
    }
};

startServer();
