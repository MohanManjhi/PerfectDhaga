const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); 

app.use(express.json()); // For parsing application/json

// Use the routes
app.use('/auth', authRoutes);

app.use('/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
