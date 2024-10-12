const express = require('express');
const db = require('../models/fabricModel'); // Adjust this to your actual DB module
const router = express.Router();

// Fetch fabrics related to a design
router.get('/related-to-design', async (req, res) => {
  try {
    const designId = req.query.designId; // Get design ID from query params
    
    // Example query to fetch fabrics based on design type or cloth type
    const query = `
      SELECT id, clothName, clothType, customClothType, material, price, description, imagePath
      FROM clothes
      WHERE clothType = (SELECT clothType FROM designs WHERE id = ?)
    `;
    
    // Fetch fabrics based on design type (you can adjust as per your need)
    const fabrics = await db.query(query, [designId]);

    res.json(fabrics); // Send fabrics data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching fabrics');
  }
});

module.exports = router;
