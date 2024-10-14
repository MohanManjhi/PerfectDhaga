const db = require('./db');  // MySQL connection

// Add item to the cart
const addToCart = (designId, fabricIds, quantity, totalPrice) => {
  return db.query(
    'INSERT INTO cart (design_id, fabric_ids, quantity, total_price, created_at) VALUES (?, ?, ?, ?, NOW())',
    [designId, JSON.stringify(fabricIds), quantity, totalPrice]
  );
};

// Remove item from cart
const removeFromCart = (designId) => {
  return db.query('DELETE FROM cart WHERE design_id = ?', [designId]);
};

// Get item in the cart
const getItemInCart = (designId) => {
  return db.query('SELECT * FROM cart WHERE design_id = ?', [designId]);
};

module.exports = { addToCart, removeFromCart, getItemInCart };
