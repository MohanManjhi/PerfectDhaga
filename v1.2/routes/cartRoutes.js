const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust the import as necessary

// POST route to add selected fabrics and design to the cart
router.post('/add', async (req, res) => {
  try {
    const { userId, designId, selectedFabrics, quantities } = req.body;

    if (!userId || !designId || !selectedFabrics || selectedFabrics.length === 0) {
      return res.status(400).json({ message: 'User, design, and fabrics must be selected' });
    }

    // Fetch the design price
    const [design] = await db.pool.query('SELECT price FROM designs WHERE id = ?', [designId]);
    if (design.length === 0) {
      return res.status(404).json({ message: 'Design not found' });
    }
    const designPrice = design[0].price;

    // Initialize an array to store insert promises
    const insertPromises = [];

    // Loop through selected fabrics and calculate the total price
    for (let i = 0; i < selectedFabrics.length; i++) {
      const fabricId = selectedFabrics[i];
      const quantity = quantities[i] || 1; // Default to 1 if quantity is not provided

      // Fetch fabric price
      const [fabric] = await db.pool.query('SELECT price FROM fabrics WHERE id = ?', [fabricId]);
      if (fabric.length === 0) {
        return res.status(404).json({ message: `Fabric with ID ${fabricId} not found` });
      }
      const fabricPrice = fabric[0].price;

      // Calculate the total price for this cart entry
      const totalPrice = (designPrice + fabricPrice) * quantity;

      // Insert into the cart table
      const query = `
        INSERT INTO cart (userId, designId, fabricId, quantity, totalPrice)
        VALUES (?, ?, ?, ?, ?)
      `;
      insertPromises.push(db.pool.query(query, [userId, designId, fabricId, quantity, totalPrice]));
    }

    // Wait for all insertions to complete
    await Promise.all(insertPromises);

    // Send a success response
    res.json({ message: 'Fabrics added to cart successfully!' });

  } catch (error) {
    console.error('Error adding fabrics to cart:', error);
    res.status(500).json({ message: 'Error adding fabrics to cart' });
  }
});

module.exports = router;
