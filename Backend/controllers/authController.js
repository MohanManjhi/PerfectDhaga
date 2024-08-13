const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin'); // Ensure you have an Admin model similar to User

const authController = {
    signup: (req, res) => {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        User.findByEmail(email, (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) throw err;

                // Create the user
                User.create({ name, email, password: hashedPassword, role }, (err, result) => {
                    if (err) throw err;
                    res.status(201).json({ message: 'User registered successfully' });
                });
            });
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        // Check if user is an Admin first
        Admin.findByUsername(email, (err, adminResults) => {
            if (adminResults.length > 0) {
                const admin = adminResults[0];

                // Compare password
                bcrypt.compare(password, admin.password, (err, isMatch) => {
                    if (err) throw err;

                    if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid email or password' });
                    }

                    // Generate JWT for admin
                    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, {
                        expiresIn: '1h',
                    });

                    return res.json({
                        token,
                        user: {
                            id: admin.id,
                            username: admin.username,
                            role: 'admin',
                        },
                    });
                });
            } else {
                // Check if user is a regular user
                User.findByEmail(email, (err, userResults) => {
                    if (userResults.length === 0) {
                        return res.status(400).json({ message: 'Invalid email or password' });
                    }

                    const user = userResults[0];

                    // Compare password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (!isMatch) {
                            return res.status(400).json({ message: 'Invalid email or password' });
                        }

                        // Generate JWT for user
                        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                            expiresIn: '1h',
                        });

                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            },
                        });
                    });
                });
            }
        });
    },
};

module.exports = authController;

/* 
code version 1.0

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    signup: (req, res) => {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        User.findByEmail(email, (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) throw err;

                // Create the user
                User.create({ name, email, password: hashedPassword, role }, (err, result) => {
                    if (err) throw err;
                    res.status(201).json({ message: 'User registered successfully' });
                });
            });
        });
    },


    
    login: (req, res) => {
        const { email, password } = req.body;
    
        // Check if user exists
        User.findByEmail(email, (err, results) => {
            if (results.length === 0) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            const user = results[0];
    
            // Compare password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
    
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
    
                // Generate JWT
                const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
    
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            });
        });
    },
};


module.exports = authController;

*/
