const db = require('./db');  // MySQL connection

// Add item to saved for later
const addToSavedForLater = (designId, fabricIds) => {
  return db.query(
    'INSERT INTO saved_for_later (design_id, fabric_ids, created_at) VALUES (?, ?, NOW())',
    [designId, JSON.stringify(fabricIds)]  // Saving fabric IDs as JSON
  );
};

// Remove item from saved for later
const removeFromSavedForLater = (designId) => {
  return db.query('DELETE FROM saved_for_later WHERE design_id = ?', [designId]);
};

// Get item in saved for later
const getItemInSaved = (designId) => {
  return db.query('SELECT * FROM saved_for_later WHERE design_id = ?', [designId]);
};

module.exports = { addToSavedForLater, removeFromSavedForLater, getItemInSaved };
