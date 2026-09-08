
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './database/dbConnection.js';
import User from './models/userModel.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Blog API is running'
    });
});

app.use('/api/users', userRoutes);


// Start server
const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log('Database connection established successfully.');

        await sequelize.sync();

        console.log('Database synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`Blog API running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();