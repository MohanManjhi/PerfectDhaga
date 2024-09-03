const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

// A sample protected route
router.get('/user-dashboard', authMiddleware.authenticateToken, (req, res) => {
    res.status(200).json({
        message: 'Welcome to the user dashboard!',
        user: req.user // This will include the user information from the JWT
    });
});

// User Dashboard (accessible only by users)
router.get('/user', authMiddleware.authenticateToken, (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ error: 'Access denied' });
    }
    dashboardController.userDashboard(req, res);
});

// Tailor Dashboard (accessible only by tailors)
router.get('/tailor', authMiddleware.authenticateToken, (req, res, next) => {
    if (req.user.role !== 'tailor') {
        return res.status(403).json({ error: 'Access denied' });
    }
    dashboardController.tailorDashboard(req, res);
});

// Vendor Dashboard (accessible only by vendors)
router.get('/vendor', authMiddleware.authenticateToken, (req, res, next) => {
    if (req.user.role !== 'vendor') {
        return res.status(403).json({ error: 'Access denied' });
    }
    dashboardController.vendorDashboard(req, res);
});

module.exports = router;
