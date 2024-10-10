const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const mysql = require('mysql2/promise');
const { registerUser , loginUser , logoutUser  } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const designController = require('../controllers/designController');
const upload = require('../middleware/uploadMiddleware');

// Configure MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Replace with your password
    database: 'perfect_dhaaga' // Replace with your database name
});

// Configure multer storage
// const storage = multer.diskStorage({
//     destination: './uploads/', // Define upload destination folder
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Create a unique file name
//     }
// });

// // Create multer instance for file uploads
// const upload = multer({ storage: storage });

// Public routes
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.get('/tailorDesign', (req, res) => {
    res.render('TailorDesign', { title: 'Register' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/register', registerUser );
router.post('/login', loginUser );
router.post('/logout', logoutUser );

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error logging out.');
        }
        res.redirect('/'); // Redirect to homepage
    });
});


// Protected routes
router.get('/user-dashboard', authMiddleware, (req, res) => {
    res.render('user_dashboard', { title: 'User  Dashboard' });
});

router.get('/tailor-dashboard', authMiddleware, (req, res) => {
    res.render('tailor_dashboard', { title: 'Tailor Dashboard' });
});

router.get('/vendor_home', authMiddleware, (req, res) => {
    res.render('vendor_home', { title: 'Vendor Dashboard' });
});

// Vendor routes
router.get('/vendor_contact', authMiddleware, (req, res) => {
    res.render('vendor_contact');
});

router.get('/vendor_payment', authMiddleware, (req, res) => {
    res.render('vendor_payment');
});

router.get('/vendor_review', authMiddleware, (req, res) => {
    res.render('vendor_review');
});

router.get('/vendor_dashboard', authMiddleware, (req, res) => {
    res.render('vendor_home');
});

router.get('/vender_order_details', authMiddleware, (req, res) => {
    res.render('vender_order_details');
});

router.get('/vendor_profile', authMiddleware, (req, res) => {
    res.render('vendor_profile');
});

router.get('/vendor_new_post', authMiddleware, (req, res) => {
    res.render('vendor_new_post');
});

// Route to handle form submission
// Route to handle clothes post with image upload
// router.post('/api/clothes', authMiddleware, upload.single('image'), async (req, res) => {
//     const { clothName, clothType, customClothType, material, price, description } = req.body;
//     const imagePath = req.file ? req.file.path : null;

//     const sql = `INSERT INTO clothes (clothName, clothType, customClothType, material, price, description, imagePath)
//                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

//     const values = [clothName, clothType, customClothType, material, price, description, imagePath];

//     try {
//         const [results] = await pool.query(sql, values);
//         console.log('Data inserted successfully:', results);
//         res.redirect("/vendor_all_post");
//     } catch (err) {
//         console.error('Error inserting data into database:', err.message);
//         res.status(500).json({ success: false, message: 'Error storing data' });
//     }
// });

// DELETE route for deleting a specific product post by ID
router.delete('/vendor/delete_post/:id', authMiddleware, async (req, res) => {
    const productId = req.params.id;

    const sql = 'DELETE FROM clothes WHERE id = ?'; // Adjust the table name to match your DB structure

    try {
        const [result] = await pool.query(sql, [productId]);
        if (result.affectedRows > 0) {
            return res.redirect('/vendor_all_post');
        } else {
            return res.status(404).send('Post not found.');
        }
    } catch (err) {
        console.error('Error deleting post:', err);
        return res.status(500).send('Error deleting post.');
    }
});

router.get("/vendor_all_post", authMiddleware, async (req, res) => {
    const query = ' SELECT * FROM clothes';
    try {
        const [results] = await pool.query(query);
        console.log(results)
        res.render('vendor_all_post', { products: results }); // Ensure this matches your EJS file name
    } catch (err) {
        console.log(err)
        res.redirect("/vendor_zero_post")
    }
})

router.get("/vendor_zero_post", authMiddleware, (req, res) => {
    res.render("vendor_zero_post")
})

router.get("/vendor_logout", authMiddleware, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/")
        }
    });
})

// Route to display user profile
router.get('/user-dashboard', authMiddleware, getUserProfile);

// Route to update user profile
router.post('/update-profile', authMiddleware, updateUserProfile);
router.post('/add-design', upload, designController.addDesign);

module.exports = router;

