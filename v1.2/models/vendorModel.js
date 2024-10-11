const db = require('./db');

const createVendor = (vendorData) => {
    console.log('Create vendor function called');
    const { name, company_name, business_type, tax_id, email, phone, password } = vendorData;

    // Replace undefined values with null
    const values = [
        name,
        company_name || null,
        business_type || null,
        tax_id || null,
        email,
        phone,
        password
    ];

    console.log('Executing query with values:', values); // Log the values being used in the query

    return db.pool.execute(
        'INSERT INTO vendors (name, company_name, business_type, tax_id, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values
    ).then((result) => {
        console.log('Vendor created successfully:', result);
    }).catch((error) => {
        console.error('Error creating vendor:', error);
    });
};

const findVendorByEmailOrPhone = (email, phone) => {
    return db.pool.execute(
        'SELECT * FROM vendors WHERE email = ? OR phone = ?',
        [email, phone]
    ).then(([rows]) => {
        return rows.length > 0 ? rows[0] : null;
    }).catch((error) => {
        console.error('Error finding vendor by email or phone:', error);
        throw error;
    });
};

module.exports = { createVendor, findVendorByEmailOrPhone };
