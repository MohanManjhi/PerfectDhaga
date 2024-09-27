// Backend/app.js
const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/dashboard.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/public/dashboard.html'));
  });

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Serve static files (CSS, JS, Images) from Frontend directory
app.use('/css', express.static(path.join(__dirname, '../Frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../Frontend/js')));
app.use('/images', express.static(path.join(__dirname, '../Frontend/images')));

// Serve HTML files from Frontend/public directory
app.use('/', express.static(path.join(__dirname, '../Frontend/public')));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
