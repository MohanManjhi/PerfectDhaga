const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { fullName, email, password, phone, gender, newsletter } = req.body;

    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password.');
        }

        // SQL query to insert user into the database
        const query = 'INSERT INTO users (fullName, email, password, phone, gender, newsletter) VALUES (?, ?, ?, ?, ?, ?)';

        // Boolean conversion for newsletter checkbox
        const newsletterSubscription = newsletter ? 1 : 0;

        db.execute(query, [fullName, email, hashedPassword, phone, gender, newsletterSubscription], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error.');
            }
            // Redirect to login or any success page after registration
            res.redirect('/login');
        });
    });
};
