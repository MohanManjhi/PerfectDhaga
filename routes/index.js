// routes/index.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mysql = require('mysql2');
const { registerUser   , loginUser   } = require('../controllers/authController');
// const{pool,testConnection}=require('../models/db')
// testConnection();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rahul@123sql', // Replace with your password
    database: 'perfect_dhaaga' // Replace with your database name
});

// Test connection function to verify database connectivity
const testConnection = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Database connected successfully!');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};
testConnection();
// Configure multer storage
const storage = multer.diskStorage({
    destination: './uploads/', // Define upload destination folder
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Create a unique file name
    }
});

// Create multer instance for file uploads
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

router.get('/user-dashboard', (req, res) => {
    res.render('user-home', { title: 'User   Dashboard' });
});

router.get('/tailor/dashboard', (req, res) => {
    res.render('tailorDashboard', { title: 'Tailor Dashboard' });
});

router.get('/vendor_home', (req, res) => {
    res.render('vendor_home', { title: 'Vendor Dashboard' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', loginUser  );
router.post('/register', registerUser   );

// Vendor routes
// router.get('/vendor_home', (req, res) => {
//     const query = 'SELECT * FROM clothes';
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching clothes data:', err);
//             return res.status(500).send('Error fetching data');
//         }
//         res.render('vendor_home', { products: results }); // Ensure this matches your EJS file name
//     });
// });

router.get('/vendor_contact', (req, res) => {
    res.render('vendor_contact');
});

router.get('/vendor_payment', (req , res) => {
    res.render('vendor_payment');
});

router.get('/vendor_review', (req , res) => {
    res.render('vendor_review');
});

router.get('/vendor_dashboard', (req, res) => {
    res.render('vendor_home');
});

router.get('/vender_order_details', (req, res) => {
    res.render('vender_order_details');
});

router.get('/vendor_profile', (req, res) => {
    res.render('vendor_profile');
});

router.get('/vendor_new_post', (req, res) => {
    res.render('vendor_new_post');
});

// Route to handle form submission
// Route to handle clothes post with image upload
router.post('/api/clothes', upload.single('image'), (req, res) => {
    const { clothName, clothType, customClothType, material, price, description } = req.body;
    const imagePath = req.file ? req.file.path : null;
console.log(req.body)
    const sql = `INSERT INTO clothes (clothName, clothType, customClothType, material, price, description, imagePath)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [clothName, clothType, customClothType, material, price, description, imagePath];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting data into database:', err.message);
            return res.status(500).json({ success: false, message: 'Error storing data' });
        }

        console.log('Data inserted successfully:', results);
        res.redirect("/vendor_all_post")
    });
});

// DELETE route for deleting a specific product post by ID
router.delete('/vendor/delete_post/:id', (req, res) => {
    const productId = req.params.id;

    const sql = 'DELETE FROM clothes WHERE id = ?'; // Adjust the table name to match your DB structure

    pool.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            return res.status(500).send('Error deleting post.');
        }

        if (result.affectedRows > 0) {
            return res.redirect('/vendor_all_post');
        } else {
            return res.status(404).send('Post not found.');
        }
    });
});
router.get("/vendor_order_post_detail_home",(req,res)=>{
    res.render("sherwani_detail")

})
router.get("/vendor_all_post",(req,res)=>{
    const query = 'SELECT * FROM clothes order by id desc';
   pool.query(query, (err, results) => {
        if (err) {
            console.log(err)
          res.redirect("/vendor_zero_post")
        }
        console.log(results)
        res.render('vendor_all_post', { products: results }); // Ensure this matches your EJS file name
    });

    
})
router.get("/vendor_zero_post",(req,res)=>{
   res.render("vendor_zero_post")

    
})
router.get("/vendor_logout",(req,res)=>{
    res.redirect("/")
})
router.get("/",(req,res)=>{
    res.send("hello world")
})
router.get("hey",(req,res)=>{
    res.send("hey")
})
module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { registerUser , loginUser  } = require('../controllers/authController');



// router.get('/', (req, res) => {
//     res.render('index', { title: 'Home' });
// });

// router.get('/about', (req, res) => {
//     res.render('about', { title: 'About Us' });
// });

// router.get('/user/dashboard', (req, res) => {
//     res.render('userDashboard', { title: 'User  Dashboard' });
// });

// router.get('/tailor/dashboard', (req, res) => {
//     res.render('tailorDashboard', { title: 'Tailor Dashboard' });
// });

// router.get('/vendor-dashboard', (req, res) => {
//     res.render('vendor_home', { title: 'Vendor Dashboard' });
// });

// router.get('/register', (req, res) => {
//     res.render('register', { title: 'Register' });
// });

// router.get('/login', (req, res) => {
//     res.render('login', { title: 'Login' });
// });

// router.post('/login', loginUser );
// router.post('/register', registerUser );



// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { registerUser  } = require('../controllers/authController');

// router.get('/', (req, res) => {
//     res.render('index', { title: 'Home' });
// });

// router.get('/about', (req, res) => {
//     res.render('about', { title: 'About Us' });
// });

// router.get('/user/dashboard', (req, res) => {
//     res.render(' userDashboard', { title: 'User Dashboard' });
// });

// router.get('/tailor/dashboard', (req, res) => {
//     res.render('tailorDashboard', { title: 'Tailor Dashboard' });
// });

// router.get('/vendor/dashboard', (req, res) => {
//     res.render('vendorDashboard', { title: 'Vendor Dashboard' });
// });



// router.get('/register', (req, res) => {
//     res.render('register', { title: 'Register' });
// });

// router.get('/login', (req, res) => {
//     res.render('login', { title: 'Login' });
// });
// router.post('/login', loginUser );
// router.post('/register', registerUser );

// module.exports = router;