const db = require('../models/db').pool;  // Import the pool from db.js

// Add Design
module.exports.addDesign = async (req, res) => {
    const tailor_id = req.session.tailor_id;  // Get the tailor_id from session
    const { title, deliveryTime, description, designType } = req.body;
    const filePath = req.file ? req.file.path : null; // Ensure the file was uploaded

    // Simple validation
    if (!title || !deliveryTime || !description || !filePath) {
        return res.status(400).send('Please fill in all required fields.');
    }

    let query = '';
    let values = [];
    let design_id; // This should hold the design_id after inserting a new design record

    // First, insert a common design entry into the designs table, including tailor_id
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
        const { upperDesignName, upperSize, upperPrice, upperMaterial, lowerDesignName, lowerSize, lowerPrice, lowerMaterial } = req.body;
        query = `INSERT INTO full_cloth_designs (design_id, upper_side_name, upper_side_size, upper_side_price, upper_side_material, lower_side_name, lower_side_size, lower_side_price, lower_side_material) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [design_id, upperDesignName, upperSize, upperPrice, upperMaterial, lowerDesignName, lowerSize, lowerPrice, lowerMaterial];
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

    // Finally, insert the image path into the design_photos table
    try {
        const photoQuery = `INSERT INTO design_photos (design_id, photo_path) VALUES (?, ?)`;
        const photoValues = [design_id, filePath];

        const connection = await db.getConnection(); // Get a connection from the pool
        await connection.execute(photoQuery, photoValues); // Insert photo path
        connection.release(); // Release the connection back to the pool

        res.status(201).send('Design and photo added successfully');
    } catch (error) {
        console.error('Error inserting design photo:', error);
        res.status(500).send('Internal Server Error while adding design photo');
    }
};
