const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Ensure the uploads folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    }
});

// Set up the upload middleware to handle a single file
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }  // Limit file size to 5MB
}).single('designPhotos'); // Specify the field name here

module.exports = upload;
