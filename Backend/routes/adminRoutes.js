const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');

// Admin dashboard route
router.get('/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
