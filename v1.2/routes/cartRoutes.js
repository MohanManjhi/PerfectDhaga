const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust the path as needed

// Endpoint to add design to cart with a single fabric
router.post('/add', async (req, res) => {
  const { userId, designId, fabric } = req.body; // Expect a single fabric object

  // Check for required fields
  if (!userId || !designId || !fabric || !fabric.clothId || !fabric.quantity) {
    return res.status(400).send('All fields are required.');
  }

  let designPrice;

  // Fetch the design price
  try {
    const priceQuery = `
      SELECT 
        COALESCE(bd.price, fcd.total_price, hcd.price) AS price 
      FROM designs d
      LEFT JOIN blouse_designs bd ON d.id = bd.design_id
      LEFT JOIN full_cloth_designs fcd ON d.id = fcd.design_id
      LEFT JOIN half_cloth_designs hcd ON d.id = hcd.design_id
      WHERE d.id = ?
    `;

    // Log the query and parameter for debugging
    console.log('Executing query:', priceQuery, 'with parameter:', [designId]);

    // Fetch the result from the database
    const [priceResult] = await db.query(priceQuery, [designId]);

    // Debugging log to inspect priceResult
    console.log('Price result:', priceResult);

    // Check if the result is valid
    if (!priceResult.length || priceResult[0].price === null) {
      return res.status(404).send('Design not found or no price available.');
    }

    // Directly access the price value
    designPrice = parseFloat(priceResult[0].price); // Convert price to float

  } catch (error) {
    console.error('Error fetching design price:', error);
    return res.status(500).send('Internal Server Error while fetching design price.');
  }

  // Initialize total price with the design price
  let totalPrice = designPrice; 

  // Get the fabric details
  const { clothId, quantity } = fabric;

  // Fetch the fabric price
  let fabricPrice;
  try {
    const fabricPriceQuery = `SELECT price FROM clothes WHERE id = ?`;
    const [fabricPriceResult] = await db.query(fabricPriceQuery, [clothId]);

    // Check if the fabric price result is valid
    if (!fabricPriceResult.length) {
      return res.status(404).send(`Fabric with ID ${clothId} not found.`);
    }

    fabricPrice = parseFloat(fabricPriceResult[0].price); // Access the price directly and convert to float
    
    // Add fabric price multiplied by quantity to the total price
    totalPrice += fabricPrice * quantity;

  } catch (error) {
    console.error('Error fetching fabric price:', error);
    return res.status(500).send('Internal Server Error while fetching fabric price.');
  }

  // Insert into cart table with the updated total price
  let cartId;
  try {
    const cartQuery = `INSERT INTO cart (user_id, design_id, design_price, total_price) VALUES (?, ?, ?, ?)`;
    const cartValues = [userId, designId, designPrice, totalPrice];
    const [cartResult] = await db.query(cartQuery, cartValues);
    cartId = cartResult.insertId; // Get the newly created cart id
  } catch (error) {
    console.error('Error adding design to cart:', error);
    return res.status(500).send('Internal Server Error while adding design to cart.');
  }

  // Insert into cart_fabrics table
  try {
    const fabricQuery = `INSERT INTO cart_fabrics (cart_id, cloth_id, quantity, fabric_price) VALUES (?, ?, ?, ?)`;
    const fabricValues = [cartId, clothId, quantity, fabricPrice];
    await db.query(fabricQuery, fabricValues);
  } catch (error) {
    console.error('Error adding fabric to cart:', error);
    return res.status(500).send('Internal Server Error while adding fabric to cart.');
  }

  res.status(201).send('Design and fabric added to cart successfully.');
});

module.exports = router;








// const express = require('express');
// const router = express.Router();
// const db = require('../models/db'); // Adjust the path as needed

// // Endpoint to add design to cart
// router.post('/add', async (req, res) => {
//   const { userId, designId, selectedFabrics } = req.body; // Include selectedFabrics

//   // Check for required fields
//   if (!userId || !designId || !selectedFabrics || !Array.isArray(selectedFabrics) || selectedFabrics.length === 0) {
//     return res.status(400).send('All fields are required.');
//   }

//   let designPrice = null;

//   // Fetch the design price
//   try {
//     const priceQuery = `
//       SELECT 
//         COALESCE(bd.price, fcd.total_price, hcd.price) AS price 
//       FROM designs d
//       LEFT JOIN blouse_designs bd ON d.id = bd.design_id
//       LEFT JOIN full_cloth_designs fcd ON d.id = fcd.design_id
//       LEFT JOIN half_cloth_designs hcd ON d.id = hcd.design_id
//       WHERE d.id = ?
//     `;

//     // Log the query and parameter for debugging
//     console.log('Executing query:', priceQuery, 'with parameter:', [designId]);

//     // Fetch the result from the database
//     const [priceResult] = await db.query(priceQuery, [designId]);

//     // Debugging log to inspect priceResult
//     console.log('Price result:', priceResult);

//     // Check if the result is valid
//     if (!priceResult || priceResult.length === 0 || priceResult[0].price === null) {
//       return res.status(404).send('Design not found or no price available.');
//     }

//     // Access the price correctly
//     designPrice = parseFloat(priceResult[0].price); // Convert price to float
//   } catch (error) {
//     console.error('Error fetching design price:', error);
//     return res.status(500).send('Internal Server Error while fetching design price.');
//   }

//   // Initialize total price with the design price
//   const totalPrice = designPrice; 

//   // Insert into cart table
//   let cartId;
//   try {
//     const cartQuery = `INSERT INTO cart (user_id, design_id, design_price, total_price) VALUES (?, ?, ?, ?)`;
//     const cartValues = [userId, designId, designPrice, totalPrice];
//     const [cartResult] = await db.query(cartQuery, cartValues);
//     cartId = cartResult.insertId; // Get the newly created cart id
//   } catch (error) {
//     console.error('Error adding design to cart:', error);
//     return res.status(500).send('Internal Server Error while adding design to cart.');
//   }

//   // Loop through selected fabrics to insert each into the cart_fabrics table
//   for (const fabric of selectedFabrics) {
//     const { clothId, quantity } = fabric;

//     if (!clothId || !quantity) {
//       return res.status(400).send('All fields are required for each fabric.');
//     }

//     // Fetch the fabric price
//     let fabricPrice = null;
//     try {
//       const fabricPriceQuery = `SELECT price FROM clothes WHERE id = ?`;
//       const [fabricPriceResult] = await db.query(fabricPriceQuery, [clothId]);

//       // Check if the fabric price result is valid
//       if (!fabricPriceResult || fabricPriceResult.length === 0) {
//         return res.status(404).send(`Fabric with ID ${clothId} not found.`);
//       }

//       fabricPrice = parseFloat(fabricPriceResult[0].price); // Access the price directly and convert to float
//     } catch (error) {
//       console.error('Error fetching fabric price:', error);
//       return res.status(500).send('Internal Server Error while fetching fabric price.');
//     }

//     // Insert into cart_fabrics table
//     try {
//       const fabricQuery = `INSERT INTO cart_fabrics (cart_id, cloth_id, quantity, fabric_price) VALUES (?, ?, ?, ?)`;
//       const fabricValues = [cartId, clothId, quantity, fabricPrice];
//       await db.query(fabricQuery, fabricValues);
//     } catch (error) {
//       console.error('Error adding fabric to cart:', error);
//       return res.status(500).send('Internal Server Error while adding fabric to cart.');
//     }
//   }

//   res.status(201).send('Design and fabrics added to cart successfully.');
// });

// module.exports = router;

