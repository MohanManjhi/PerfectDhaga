const express = require('express');
const router = express.Router();
const { checkSession } = require('../controllers/authController');

// Route for checking session status
router.get('/check-login', checkSession);

module.exports = router;
