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

<<<<<<< HEAD
module.exports = { createTailor, findTailorByEmailOrPhone };
=======

const addDesign = async (design) => {
    const { tailor_id, title, description, delivery_time } = design;
    const query = `
        INSERT INTO designs (tailor_id, title, description, delivery_time)
        VALUES (?, ?, ?, ?)
    `;
    await db.execute(query, [tailor_id, title, description, delivery_time]);
};

// Fetch all designs for the homepage
const getDesigns = async () => {
    const [rows] = await db.execute(`SELECT * FROM designs ORDER BY created_at DESC`);
    return rows;
};

// Fetch a specific tailor's designs
const getTailorDesigns = async (tailorId) => {
    const [rows] = await db.execute(`SELECT * FROM designs WHERE tailor_id = ?`, [tailorId]);
    return rows;
};

module.exports = {
    createTailor, findTailorByEmailOrPhone ,
    addDesign,
    getDesigns,
    getTailorDesigns
};
>>>>>>> cc5c6c55c54b976c650c711083dff5cfa83c7d3c
