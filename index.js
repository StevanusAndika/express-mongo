// Import module
const express = require('express');
const router = require('./routes');
const dotenv = require('dotenv'); // Untuk membaca file .env

// Load environment variables
dotenv.config();

// Init app
const app = express();

// Define port dari .env (default: 3000)
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing request body
app.use(express.json()); // Untuk menerima JSON
app.use(express.urlencoded({ extended: false })); // Untuk menerima form-urlencoded

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define API routes
app.use('/api', router);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
