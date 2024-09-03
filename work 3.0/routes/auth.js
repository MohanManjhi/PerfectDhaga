const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ensure signup is defined and exported in your controller
router.post('/signup', authController.signup);

// New login route
router.post('/login', authController.login);

//forgot password
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
