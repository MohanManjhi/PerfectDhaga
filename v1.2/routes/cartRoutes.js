const express = require('express');
const router = express.Router();

// Assume we have a cart model that handles cart operations
const cartModel = require('../models/cartModel');

router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, designId, fabricId, quantity } = req.body;
    
    // Add design and fabric to the cart (adjust logic as per your cart table schema)
    await cartModel.addToCart(userId, designId, fabricId, quantity);
    
    res.status(200).send('Item added to cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding to cart');
  }
});

module.exports = router;
