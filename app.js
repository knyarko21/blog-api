
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./database/dbConnection.js";
import User from "./models/userModel.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());

app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running"
    });
});


// User routes
app.use("/api/users", userRoutes);


// Start server
const startServer = async () => {
    try {

        // Test database connection
        await sequelize.authenticate();

        console.log("Database connection established successfully.");


        // Synchronize models with database
        await sequelize.sync();

        console.log("Database synchronized successfully.");


        // Start Express server
        app.listen(PORT, () => {
            console.log(`Blog API running on http://localhost:${PORT}`);
        });

    } catch (error) {

        console.error(
            "Unable to connect to the database:",
            error.message
        );
    }
};


startServer();