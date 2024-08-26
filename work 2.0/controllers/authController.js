const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.signup = (req, res) => {
  const { firstName, middleName, phoneNumber, email, role, password } = req.body;
  
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password hashing failed' });

    // Insert new user into the database
    const query = 'INSERT INTO users (firstName, middleName, phoneNumber, email, role, password) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [firstName, middleName, phoneNumber, email, role, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, users) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (users.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = users[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Password comparison failed' });
      if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};
