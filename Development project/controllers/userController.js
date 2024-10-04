const pool = require('../models/db'); // Ensure you have a database connection setup

// Controller to get user profile
exports.getUserProfile = (req, res) => {
    const userId = req.session.userId;
    const sql = 'SELECT fullName, email, phone, address FROM users WHERE id = ?';

    pool.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send('Error fetching user data');
        }
        const user = results[0];
        res.render('user_dashboard', { user });
    });
};

// Controller to update user profile
exports.updateUserProfile = (req, res) => {
    const userId = req.session.userId;
    const { fullName, address } = req.body;
    const sql = 'UPDATE users SET fullName = ?, address = ? WHERE id = ?';

    pool.query(sql, [fullName, address, userId], (err, results) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).send('Error updating user data');
        }
        res.redirect('/user-dashboard');
    });
};