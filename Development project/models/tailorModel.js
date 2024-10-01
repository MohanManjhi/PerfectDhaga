const db = require('./db');

const createTailor = async (tailorData) => {
    try {
        const query = 'INSERT INTO tailors SET ?';
        await db.pool.execute(query, tailorData);
    } catch (error) {
        console.error('Error creating tailor:', error);
    }
};

module.exports = { createTailor };