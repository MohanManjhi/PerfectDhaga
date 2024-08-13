const db = require('../config/db');

const Admin = {
    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM Admin WHERE username = ?';
        db.query(sql, [username], callback);
    },
};

module.exports = Admin;
