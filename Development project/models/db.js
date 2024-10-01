const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'perfect_dhaaga'
});

const testConnection = async () => {
    try {
 await pool.execute('SELECT 1 + 1 AS solution');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = { testConnection };