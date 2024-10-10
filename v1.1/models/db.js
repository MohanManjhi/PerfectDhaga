const mysql = require('mysql2/promise');

// Define database connection settings
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your password
  database: 'perfect_dhaaga' // Replace with your database name
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test connection function to verify database connectivity
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Export the pool for use in other parts of your application
module.exports = {pool,testConnection};

// // db.js
// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root', // Replace with your password
//     database: 'perfect_dhaaga' // Replace with your database name
// });

// // Test connection function to verify database connectivity
// const testConnection = async () => {
//     try {
//         const connection = await pool.promise().getConnection();
//         console.log('Database connected successfully!');
//         connection.release();
//     } catch (error) {
//         console.error('Database connection failed:', error.message);
//     }
// };

// // Export both the pool (for queries) and the test connection function
// module.exports = { pool: pool.promise(), testConnection };
