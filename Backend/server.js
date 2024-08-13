//code version 1.1

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies

app.use(express.json());

// the auth routes
app.use('/api/auth', authRoutes);

// the admin routes
app.use('/api/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});









// code 1.0

// const express = require('express');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Basic route to test the server
// app.get('/', (req, res) => {
//     res.send('Perfect धागा API is running...');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
