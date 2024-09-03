const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// const { User } = require('../models'); 
const User = require('../models/userModel'); 


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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a reset token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send the reset token via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-email-password' // Replace with your email password
            }
        });

        const mailOptions = {
            to: email,
            from: 'your-email@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n
                Please click on the following link, or paste it into your browser, to complete the process:\n\n
                http://localhost:3000/reset-password?token=${token}\n\n
                If you did not request this, please ignore this email.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Reset link sent to your email.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};

// Reset the password
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() } // Ensure token is not expired
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};