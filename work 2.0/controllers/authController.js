const connection = require('../config/db'); // Ensure this path is correct

const signup = (req, res) => {
    const { firstName, middleName, phoneNumber, email, role, password } = req.body;

    console.log('Received data:', req.body); // Log the received data

    const query = 'INSERT INTO users (firstName, middleName, phoneNumber, email, role, password) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [firstName, middleName, phoneNumber, email, role, password];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ success: false, message: 'Database error', error });
        }
        console.log('Insert results:', results);
        res.json({ success: true, message: 'User signed up successfully' });
    });
};

module.exports = { signup };
