const pool = require('../models/db'); // Ensure you have a database connection setup

// Controller to get user profile
exports.getUserProfile = async (req, res) => {
  const userId = req.session.userId;
  const sql = 'SELECT name, email, phone, address FROM users WHERE id = ?';

  try {
    const [results] = await pool.execute(sql, [userId]);
    const user = results[0];
    res.render('user_dashboard', { user });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Error fetching user data');
  }
};

exports.updateUserProfile = async (req, res) => {
    try {
      console.log('Request body:', req.body); // Log the request body
      const userId = req.session.userId;
      const { name, address } = req.body;
      console.log('User  ID:', userId); // Log the user ID
  
      const sql = 'UPDATE users SET name = ?, address = ? WHERE id = ?';
      const [results] = await pool.execute(sql, [name, address, userId]);
  
      if (results.affectedRows === 0) {
        res.status(404).send('User  not found');
      } else {
        res.redirect('/user-dashboard');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      res.status(500).send('Error updating user data');
    }
  };
