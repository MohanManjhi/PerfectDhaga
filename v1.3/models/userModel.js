const db = require('./db');

const createUser  = (userData) => {
    console.log('Create user function called');
    const { name, address, email, phone, password } = userData;
    return db.pool.execute(
        'INSERT INTO users (name, address, email, phone, password) VALUES (?, ?, ?, ?, ?)',
        [name, address, email, phone, password]
    ).then((result) => {
        console.log('User  created successfully:', result);
    }).catch((error) => {
        console.error('Error creating user:', error);
    });
};

const findUserByEmailOrPhone = (email, phone) => {
    return db.pool.execute(
        'SELECT * FROM users WHERE email = ? OR phone = ?',
        [email, phone]
    ).then(([rows]) => {
        return rows.length > 0 ? rows[0] : null;
    }).catch((error) => {
        console.error('Error finding user by email or phone:', error);
        throw error;
    });
};

module.exports = { createUser , findUserByEmailOrPhone };
