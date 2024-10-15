const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

// Route to add items to cart
router.post('/add', cartController.addToCart);

// Route to get all items in the cart
// router.get('/', cartController.getCartItems);

module.exports = router;
