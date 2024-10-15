const express = require('express');
const db = require('../models/db'); // Correctly import db.js
const router = express.Router();

// Fetch fabrics related to a design
router.get('/related-to-design', async (req, res) => {
  try {
    const designId = req.query.designId; // Get design ID from query params
    
    if (!designId) {
      return res.status(400).json({ error: 'Design ID is required' });
    }
    
    // Example query to fetch fabrics based on design type
    const query = `
      SELECT id, clothName, clothType, customClothType, material, price, description, imagePath
      FROM clothes
      WHERE clothType = (SELECT clothType FROM designs WHERE id = ?)
    `;
    
    // Fetch fabrics based on design type
    const fabrics = await db.query(query, [designId]);

    if (fabrics.length === 0) {
      return res.status(404).json({ message: 'No fabrics found for this design' });
    }

    res.json(fabrics); // Send fabrics data as JSON
  } catch (error) {
    console.error('Error fetching fabrics:', error.message); // Log the specific error
    res.status(500).json({ error: 'Error fetching fabrics' }); // Send error in JSON format
  }
});

module.exports = router;
