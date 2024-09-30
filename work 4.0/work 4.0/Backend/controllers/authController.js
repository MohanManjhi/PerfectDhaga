// Backend/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registration Handler
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      name,
      email,
      hashedPassword,
      role,
    ]);

    res.redirect('/login.html'); // Redirect to login page after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Login Handler
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from database
    const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT Token (optional)
    const token = jwt.sign({ id: user[0].id, role: user[0].role }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    // Set token in cookies or send it to the client
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard.html'); // Redirect to dashboard
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
