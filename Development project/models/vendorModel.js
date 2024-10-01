const db = require('./db');

const createVendor = async (vendorData) => {
    try {
        const query = 'INSERT INTO vendors SET ?';
        await db.pool.execute(query, vendorData);
    } catch (error) {
        console.error('Error creating vendor:', error);
    }
};

module.exports = { createVendor };