// Importing necessary libraries and routes
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// Middleware setup for JSON parsing and CORS
app.use(express.json());
app.use(cors());

// Environment configuration and database connection
dotenv.config();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routing setup for contact management
app.use('/contacts', contactRoutes);

// Server initialization
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
