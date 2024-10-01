const db = require('./db');

const createUser  = async (userData) => {
    try {
        const query = 'INSERT INTO users SET ?';
        await db.pool.execute(query, userData);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

module.exports = { createUser  };