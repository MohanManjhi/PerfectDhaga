const mysql = require('mysql2/promise');

// Define database connection settings
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your actual password
  database: 'perfect_dhaaga' // Replace with your actual database name
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test connection function to verify database connectivity
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Export the pool and testConnection function for use in other parts of your application
module.exports = { pool, testConnection };