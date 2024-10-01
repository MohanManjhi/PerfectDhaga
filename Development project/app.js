const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { testConnection } = require('./models/db');

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await testConnection();
});