// db.js
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



const query = async (sql, params = []) => {
  try {
    if (params.length === 0) {
      // Use query method for SQL commands that do not need parameters
      const [rows] = await pool.query(sql);
      return rows;
    } else {
      // Use execute method for SQL commands with parameters
      const [rows] = await pool.execute(sql, params);
      return rows;
    }
  } catch (error) {
    console.error('Query failed:', error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};


module.exports = { pool, testConnection, query };

