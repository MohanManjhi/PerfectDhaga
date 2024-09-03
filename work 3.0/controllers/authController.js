const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); 

exports.signup = (req, res) => {
    const { firstName, lastName, phoneNumber, email, role, password, shopName, serviceProvided, itemsProvided } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Password hashing error:", err);
            return res.status(500).json({ error: 'Password hashing failed' });
        }

        let query = 'INSERT INTO users (firstName, lastName, phoneNumber, email, role, password) VALUES (?, ?, ?, ?, ?, ?)';
        let values = [firstName, lastName, phoneNumber, email, role, hashedPassword];

        if (role === 'tailor') {
            query = 'INSERT INTO users (firstName, lastName, phoneNumber, email, role, password, shopName, serviceProvided) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            values = [firstName, lastName, phoneNumber, email, role, hashedPassword, shopName, serviceProvided];
        } else if (role === 'vendor') {
            query = 'INSERT INTO users (firstName, lastName, phoneNumber, email, role, password, shopName, itemsProvided) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            values = [firstName, lastName, phoneNumber, email, role, hashedPassword, shopName, itemsProvided];
        }

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error("Database insertion error:", err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Password comparison error:", err);
                return res.status(500).json({ error: 'Password comparison failed' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate a JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET, // Make sure this is defined in your .env file
                { expiresIn: '1h' }
            );

            // Respond with the token
            res.status(200).json({
                message: 'Login successful',
                token: token
            });
        });
    });
};
