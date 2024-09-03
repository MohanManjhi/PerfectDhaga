const express = require('express');
const cors = require('cors'); 
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); 

// Use CORS middleware
app.use(cors());

app.use(express.json()); // For parsing application/json

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
