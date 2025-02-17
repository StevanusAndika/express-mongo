// Import Express
const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

// Import Router
const router = require('./routes');

// Init App
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Define Port
const port = process.env.PORT || 3000;

// Cek koneksi database
const prisma = new PrismaClient();
async function checkDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Keluar jika koneksi gagal
    }
}

// Jalankan pengecekan koneksi database
checkDatabaseConnection();

// Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define Routes
app.use('/api', router);

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
