// app.js
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rahul@123sql',
    database: 'Vendor_post_database'
});

// Connect to the database
connection.connect((err) => {
   if (err) throw err;
   console.log('Connected to the MySQL database.');
});

const app = express();
const port = 3000;
// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'images')));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Configure multer for file uploads
// Set storage engine for multer
// Configure multer storage
const storage = multer.diskStorage({
    destination: './uploads/', // Define upload destination folder
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Create a unique file name
    }
});

// Create multer instance for file uploads
const upload = multer({ storage: storage });
// Define routes
app.get('/home', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/register', (req, res) => {
    res.render('login-register');
});
app.get("/vendor_order_post_detail",(req,res)=>{
    res.render("vendor_order_post_detail")
})
//vendor routes 
app.get("/vendor_home",(req,res)=>{
    const query = 'SELECT * FROM clothes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching clothes data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.render('vendor_home', { products: results }); // Ensure this matches your EJS file name
    });
    
})
app.get("/vendor_contact",(req,res)=>{
    res.render("vendor_contact")
})
app.get("/vendor_payment",(req,res)=>{
    res.render("vendor_payment")
})
app.get("/vendor_review",(req,res)=>{
    res.render("vendor_review")
})
app.get("/vendor_dashboard",(req,res)=>{
    res.render("vendor-dashboard")
})
app.get("/vender_order_details",(req,res)=>{
    res.render("vender_order_details")
})
app.get("/vendor_profile",(req,res)=>{
    res.render("vendor_profile")
})
app.get("/vendor_new_post",(req,res)=>{
    res.render("vendor_new_post")
})
// Route to handle form submission
// Route to handle clothes post with image upload
app.post('/api/clothes', upload.single('image'), (req, res) => {
    // Extract form data from the request body
    const { clothName, clothType, customClothType, material, price, description } = req.body;

    // Get the path of the uploaded file (or set to null if no file was uploaded)
    const imagePath = req.file ? req.file.path : null;
console.log(imagePath)
    // SQL query to insert the form data and image path into the database
    const sql = `INSERT INTO clothes (clothName, clothType, customClothType, material, price, description, imagePath)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Values to insert into the database
    const values = [clothName, clothType, customClothType, material, price, description, imagePath];

    // Execute the SQL query
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ success: false, message: 'Error storing data' });
        }

        console.log('Data inserted successfully:', results);
        // Redirect to a success page or render a view
        res.redirect("/vendor_home"); // or send a JSON response: res.json({ success: true, message: 'Cloth post created successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});