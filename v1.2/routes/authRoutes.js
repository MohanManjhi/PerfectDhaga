// const express = require('express');
// const { checkSession } = require('../controllers/authController');
// const router = express.Router();

// router.get('/check-session', checkSession);

// module.exports = router;

// routes/authRoutes.js
const express = require('express');
const router = express.Router();

router.get('/check-login', (req, res) => {
    // Check if the user is authenticated
    if (req.session && req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
