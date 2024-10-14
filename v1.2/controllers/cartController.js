const { addToCart, removeFromCart, getItemInCart } = require('../models/cartModel');  // MySQL queries for cart actions
const { addToSavedForLater, removeFromSavedForLater, getItemInSaved } = require('../models/savedForLaterModel');  // MySQL queries for saved for later actions


// Add item to cart
exports.addToCart = async (req, res) => {
  const { designId, selectedFabrics, quantity, totalPrice } = req.body;  // Assuming selectedFabrics is an array of fabricIds

  try {
    // Ensure the designId and selectedFabrics are valid
    if (!designId || !Array.isArray(selectedFabrics) || selectedFabrics.length === 0) {
      return res.status(400).json({ message: 'Invalid designId or fabrics.' });
    }

    // Add to the cart
    await addToCart(designId, selectedFabrics, quantity, totalPrice);

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Save item for later
exports.saveForLater = async (req, res) => {
  const { designId, fabricIds } = req.body;

  try {
    // Check if the item exists in the cart first
    const [cartRows] = await getItemInCart(designId); // Modify with your model method
    if (cartRows.length === 0) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    // Move item to saved for later
    await addToSavedForLater(designId, fabricIds);

    // Remove from cart
    await removeFromCart(designId);

    res.status(200).json({ message: 'Item saved for later' });
  } catch (error) {
    console.error('Error saving item for later:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Move item back to the cart
exports.moveToCart = async (req, res) => {
  const { designId, fabricIds } = req.body;

  try {
    // Check if the item exists in the saved for later table first
    const [savedRows] = await getItemInSaved(designId); // Modify with your model method
    if (savedRows.length === 0) {
      return res.status(404).json({ message: 'Item not found in saved for later.' });
    }

    // Move saved item back to cart
    await addToCart(designId, fabricIds);

    // Remove from saved for later
    await removeFromSavedForLater(designId);

    res.status(200).json({ message: 'Item moved to cart' });
  } catch (error) {
    console.error('Error moving item to cart:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};


// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { designId } = req.params;

  try {
    // Ensure the item exists in the cart before removing
    const [cartRows] = await getItemInCart(designId);
    if (cartRows.length === 0) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    // Remove from the cart
    await removeFromCart(designId);

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};