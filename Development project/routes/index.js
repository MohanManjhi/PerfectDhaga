const express = require('express');
const router = express.Router();
const { registerUser  } = require('../controllers/authController');

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', registerUser );

module.exports = router;