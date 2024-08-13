const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const { name, email, password, role } = userData;
        const sql = 'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, password, role], callback);
    },

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM Users WHERE email = ?';
        db.query(sql, [email], callback);
    },
};

module.exports = User;
