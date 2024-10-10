CREATE DATABASE perfect_dhaaga;

USE perfect_dhaaga;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    password VARCHAR(255)
);

CREATE TABLE tailors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    experience INT,
    specialization VARCHAR(255),
    portfolio VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    password VARCHAR(255)
);

CREATE TABLE vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    company_name VARCHAR(255),
    business_type VARCHAR(255),
    tax_id VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    password VARCHAR(255)
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique ID for each order
    customerID VARCHAR(255) NOT NULL,        -- Stores the Customer ID
    customerName VARCHAR(255) NOT NULL,      -- Stores the Customer Name
    vendorID VARCHAR(255) NOT NULL,          -- Stores the Vendor ID
    vendorName VARCHAR(255) NOT NULL,        -- Stores the Vendor Name
    clothName VARCHAR(255) NOT NULL,         -- Stores the name of the cloth
    clothSize VARCHAR(10) NOT NULL,          -- Stores the selected cloth size
    deliveryDate DATE NOT NULL,              -- Stores the expected delivery date
    description TEXT,                        -- Stores any additional description
    imagePath VARCHAR(255),                  -- Stores the path to the uploaded image file
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the order was created
);
