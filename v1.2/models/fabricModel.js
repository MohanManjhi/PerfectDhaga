const db = require('./db');

module.exports = {
    getFabricsByDesign: async (designId) => {
      const query = `
        SELECT id, clothName, clothType, customClothType, material, price, description, imagePath
        FROM clothes
        WHERE clothType = (SELECT clothType FROM designs WHERE id = ?)
      `;
      
      // Adjust according to your DB query method (e.g., Sequelize, Knex, etc.)
      const fabrics = await db.query(query, [designId]);
      return fabrics;
    },
  };
  