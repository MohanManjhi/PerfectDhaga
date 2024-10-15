const db = require('../models/db').pool;  // Import the pool from db.js
// const { pool } = require('../models/db'); // Import the pool from db.js


module.exports.addDesign = async (req, res) => {
  const tailor_id = req.session.tailor_id;  // Get the tailor_id from session
  const { title, deliveryTime, description, designType } = req.body;
  const fileName = req.file ? req.file.filename : null; // Store only the filename

  // Simple validation
  if (!title || !deliveryTime || !description || !fileName) {
      return res.status(400).send('Please fill in all required fields.');
  }

  let query = '';
  let values = [];
  let design_id; // This will hold the design_id after inserting a new design record

  // Insert a common design entry into the designs table, including tailor_id
  try {
      const designQuery = `INSERT INTO designs (tailor_id, title, delivery_time, description) VALUES (?, ?, ?, ?)`;
      const designValues = [tailor_id, title, deliveryTime, description];
      
      const connection = await db.getConnection(); // Ensure you're using the pool
      const [designResult] = await connection.execute(designQuery, designValues);
      design_id = designResult.insertId; // Get the newly inserted design_id
      connection.release(); // Release the connection back to the pool
  } catch (error) {
      console.error('Error inserting design:', error);
      return res.status(500).send('Internal Server Error while inserting design');
  }

  // Adjust the query based on design type
  if (designType === 'blouse') {
      const { blouseName, blousePrice, blouseMaterial } = req.body;
      query = `INSERT INTO blouse_designs (design_id, name, price, material) VALUES (?, ?, ?, ?)`;
      values = [design_id, blouseName, blousePrice, blouseMaterial];
  } else if (designType === 'full_cloth') {
      const { upperDesignName, upperSize, upperMaterial, lowerDesignName, lowerSize, lowerMaterial, totalPrice } = req.body;
      query = `INSERT INTO full_cloth_designs (design_id, upper_side_name, upper_side_size, upper_side_material, lower_side_name, lower_side_size, lower_side_material, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      values = [design_id, upperDesignName, upperSize, upperMaterial, lowerDesignName, lowerSize, lowerMaterial, totalPrice];
  } else if (designType === 'half_cloth') {
      const { halfDesignName, halfSize, halfPrice, halfMaterial } = req.body;
      query = `INSERT INTO half_cloth_designs (design_id, name, size, price, material) VALUES (?, ?, ?, ?, ?)`;
      values = [design_id, halfDesignName, halfSize, halfPrice, halfMaterial];
  }

  // Execute the design-specific query
  try {
      const connection = await db.getConnection(); // Get a connection from the pool
      await connection.execute(query, values); // Execute the query
      connection.release(); // Release the connection back to the pool
  } catch (error) {
      console.error('Error executing query:', error);
      return res.status(500).send('Internal Server Error while adding design details');
  }

  // Finally, insert the image file name into the design_photos table
  try {
      const photoQuery = `INSERT INTO design_photos (design_id, photo_path) VALUES (?, ?)`;
      const photoValues = [design_id, fileName]; // Store only the file name, not the full path

      const connection = await db.getConnection(); // Get a connection from the pool
      await connection.execute(photoQuery, photoValues); // Insert photo file name
      connection.release(); // Release the connection back to the pool

      res.status(201).send('Design and photo added successfully');
  } catch (error) {
      console.error('Error inserting design photo:', error);
      res.status(500).send('Internal Server Error while adding design photo');
  }
};


module.exports.getTailorDesigns = async (req, res) => {
  try {
    const query = `
      SELECT d.id, d.title, d.description, d.delivery_time,
      COALESCE(bd.price, fcd.total_price, hcd.price) AS price, 
      dp.photo_path,
      COALESCE(bd.material, CONCAT(fcd.upper_side_material, ', ', fcd.lower_side_material), hcd.material) AS materials
      FROM designs d
      LEFT JOIN design_photos dp ON d.id = dp.design_id
      LEFT JOIN blouse_designs bd ON d.id = bd.design_id
      LEFT JOIN full_cloth_designs fcd ON d.id = fcd.design_id
      LEFT JOIN half_cloth_designs hcd ON d.id = hcd.design_id
      ORDER BY d.created_at DESC
      LIMIT 8
    `;

    const [rows] = await db.query(query);  // Use the correct pool query method

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No designs found' });
    }

    res.status(200).json(rows);  // Return the designs with raw materials
  } catch (error) {
    console.error('Error fetching tailor designs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


