remaining and future based task 

task 1

Transaction Handling:

In case of any failure during the design insertion (e.g., inserting the design details or design photo), it would be better to roll back the changes to avoid leaving partial data in the database. You can use MySQL transactions for this purpose.
Here's an updated version using transactions:

js
Copy code
const connection = await db.getConnection(); // Get connection from pool
await connection.beginTransaction(); // Start the transaction

try {
    // Insert into designs table
    const designQuery = `INSERT INTO designs (tailor_id, title, delivery_time, description) VALUES (?, ?, ?, ?)`;
    const designValues = [tailor_id, title, deliveryTime, description];
    const [designResult] = await connection.execute(designQuery, designValues);
    design_id = designResult.insertId;

    // Insert into specific design table (blouse, full_cloth, half_cloth)
    if (designType === 'blouse') {
        const { blouseName, blousePrice, blouseMaterial } = req.body;
        const blouseQuery = `INSERT INTO blouse_designs (design_id, name, price, material) VALUES (?, ?, ?, ?)`;
        await connection.execute(blouseQuery, [design_id, blouseName, blousePrice, blouseMaterial]);
    } else if (designType === 'full_cloth') {
        const { upperDesignName, upperSize, upperPrice, upperMaterial, lowerDesignName, lowerSize, lowerPrice, lowerMaterial } = req.body;
        const fullClothQuery = `INSERT INTO full_cloth_designs (design_id, upper_side_name, upper_side_size, upper_side_price, upper_side_material, lower_side_name, lower_side_size, lower_side_price, lower_side_material) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await connection.execute(fullClothQuery, [design_id, upperDesignName, upperSize, upperPrice, upperMaterial, lowerDesignName, lowerSize, lowerPrice, lowerMaterial]);
    } else if (designType === 'half_cloth') {
        const { halfDesignName, halfSize, halfPrice, halfMaterial } = req.body;
        const halfClothQuery = `INSERT INTO half_cloth_designs (design_id, name, size, price, material) VALUES (?, ?, ?, ?, ?)`;
        await connection.execute(halfClothQuery, [design_id, halfDesignName, halfSize, halfPrice, halfMaterial]);
    }

    // Insert the image path into the design_photos table
    const photoQuery = `INSERT INTO design_photos (design_id, photo_path) VALUES (?, ?)`;
    await connection.execute(photoQuery, [design_id, filePath]);

    // Commit the transaction
    await connection.commit();
    connection.release();
    res.status(201).send('Design and photo added successfully');
} catch (error) {
    // Rollback the transaction if an error occurs
    await connection.rollback();
    connection.release();
    console.error('Error inserting design:', error);
    res.status(500).send('Internal Server Error while adding design');
}
This ensures that all inserts are part of a single transaction, and if any part fails, the transaction is rolled back, leaving no incomplete data in the database.





task 2.


Enhance Error Messages:

Instead of generic error messages like 'Internal Server Error', it’s better to provide more specific feedback based on the error type (e.g., file upload failure, database issues, etc.) to help with debugging.


Improvements in the File Upload Middleware:
File Type Validation: The fileFilter function ensures that only images with extensions .jpeg, .jpg, .png, and .gif are allowed.
Error Handling: If the file type is invalid, an error is thrown, and the request can be handled accordingly.




