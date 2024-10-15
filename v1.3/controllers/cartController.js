const { pool } = require('../models/db');

// Add items to cart
// module.exports.addToCart = async (req, res) => {
//   try {
//     const { userId, designId, selectedFabrics } = req.body;
//     console.log("user id: ", userId);
//     console.log("design id : ", designId);
//     console.log("select fabrics id ",selectedFabrics);
//     // Validate input data
//     if (!userId || !designId || !selectedFabrics || selectedFabrics.length === 0) {
//       return res.status(400).json({ message: 'Invalid data provided' });
//     }


//     // Fetch the design price
//     const [[design]] = await db.query(`
//       SELECT COALESCE(bd.price, fcd.total_price, hcd.price) AS designPrice
//       FROM designs d
//       LEFT JOIN blouse_designs bd ON d.id = bd.design_id
//       LEFT JOIN full_cloth_designs fcd ON d.id = fcd.design_id
//       LEFT JOIN half_cloth_designs hcd ON d.id = hcd.design_id
//       WHERE d.id = ?
//     `, [designId]);

//     if (!design) {
//       return res.status(404).json({ message: 'Design not found' });
//     }

//     const designPrice = parseFloat(design.designPrice); // Get design price in decimal

//     // Loop through each selected fabric and add the fabric and design price to the cart
//     for (const fabric of selectedFabrics) {
//       const { fabricId, quantity } = fabric;

//       // Fetch fabric price from the clothes table
//       const [[cloth]] = await db.query('SELECT price FROM clothes WHERE id = ?', [fabricId]);

//       if (!cloth) {
//         return res.status(404).json({ message: 'Fabric not found' });
//       }

//       const fabricPrice = parseFloat(cloth.price); // Get fabric price in decimal
//       const totalPrice = ((fabricPrice * quantity) + designPrice).toFixed(2); // Sum design price and fabric price

//       // Insert the fabric and design into the cart
//       await db.query(`
//         INSERT INTO cart (userId, designId, clothId, quantity, totalPrice) 
//         VALUES (?, ?, ?, ?, ?) 
//         ON DUPLICATE KEY UPDATE 
//         quantity = quantity + ?, 
//         totalPrice = totalPrice + ?`, 
//         [userId, designId, fabricId, quantity, totalPrice, quantity, totalPrice]);
//     }

//     res.status(201).json({ message: 'Fabrics and design added to cart successfully.' });
//   } catch (error) {
//     console.error('Error adding items to cart:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

exports.addToCart = async (req, res) => {
  const { userId, designId, selectedFabrics } = req.body;

  console.log("user id: ", userId);
  console.log("design id : ", designId);
  console.log("select fabrics id ", selectedFabrics);

  // Validate input
  if (!userId || !designId || !selectedFabrics || selectedFabrics.length === 0) {
    return res.status(400).json({ message: 'Invalid data. Please provide design and fabrics.' });
  }

  // Begin a transaction to ensure data consistency
  const connection = await pool.getConnection();  // Get a connection from the pool

  try {
    await connection.beginTransaction();  // Begin the transaction

    // Loop through selected fabrics and insert each one into the cart table
    for (let fabric of selectedFabrics) {
      const { fabricId, quantity } = fabric;

      // Fetch fabric details from the clothes table
      const [fabricDetails] = await connection.execute(
        'SELECT price FROM clothes WHERE id = ?',
        [fabricId]
      );

      if (fabricDetails.length === 0) {
        return res.status(404).json({ message: `Fabric with ID ${fabricId} not found.` });
      }

      const totalPrice = parseFloat(fabricDetails[0].price) * parseInt(quantity, 10);

      // Insert the fabric into the cart
      await connection.execute(
        'INSERT INTO cart (userId, designId, clothId, quantity, totalPrice) VALUES (?, ?, ?, ?, ?)',
        [userId, designId, fabricId, quantity, totalPrice]
      );
    }

    // Commit the transaction if all fabrics were added successfully
    await connection.commit();
    res.status(200).json({ message: 'Fabrics added to cart successfully.' });

  } catch (error) {
    // Rollback the transaction if there was an error
    await connection.rollback();
    console.error('Error adding fabrics to cart:', error);
    res.status(500).json({ message: 'Error adding fabrics to cart. Please try again later.' });

  } finally {
    // Release the connection back to the pool
    connection.release();
  }
};


// Get all items in the cart for a specific user
// module.exports.getCartItems = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assume the user ID comes from the authenticated user session

//     const [cartItems] = await db.query(`
//       SELECT c.id, d.title AS designTitle, cl.clothName AS fabricName, 
//       c.quantity, c.totalPrice, cl.price AS fabricPrice, 
//       COALESCE(bd.price, fcd.total_price, hcd.price) AS designPrice
//       FROM cart c
//       INNER JOIN designs d ON c.designId = d.id
//       INNER JOIN clothes cl ON c.clothId = cl.id
//       LEFT JOIN blouse_designs bd ON d.id = bd.design_id
//       LEFT JOIN full_cloth_designs fcd ON d.id = fcd.design_id
//       LEFT JOIN half_cloth_designs hcd ON d.id = hcd.design_id
//       WHERE c.userId = ?
//     `, [userId]);

//     if (cartItems.length === 0) {
//       return res.status(404).json({ message: 'Cart is empty' });
//     }

//     res.status(200).json(cartItems);
//   } catch (error) {
//     console.error('Error fetching cart items:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };
