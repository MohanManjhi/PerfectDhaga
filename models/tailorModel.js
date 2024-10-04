const db = require('./db');

const createTailor = (tailorData) => {
    console.log('Create tailor function called');
    const { name, experience, specialization, portfolio, email, phone, password } = tailorData;
    return db.pool.execute(
        'INSERT INTO tailors (name, experience, specialization, portfolio, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, experience, specialization, portfolio, email, phone, password]
    ).then((result) => {
        console.log('Tailor created successfully:', result);
    }).catch((error) => {
        console.error('Error creating tailor:', error);
    });
};

const findTailorByEmailOrPhone = (email, phone) => {
    return db.pool.execute(
        'SELECT * FROM tailors WHERE email = ? OR phone = ?',
        [email, phone]
    ).then(([rows]) => {
        return rows.length > 0 ? rows[0] : null;
    }).catch((error) => {
        console.error('Error finding tailor by email or phone:', error);
        throw error;
    });
};

module.exports = { createTailor, findTailorByEmailOrPhone };