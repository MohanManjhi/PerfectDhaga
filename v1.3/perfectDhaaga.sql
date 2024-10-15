CREATE DATABASE perfect_dhaaga;

USE perfect_dhaaga;

UPDATE users SET name = "Anu", address = "indore" WHERE id = 1;

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


CREATE TABLE clothes (
   id INT AUTO_INCREMENT PRIMARY KEY,
   clothName VARCHAR(100),
   clothType VARCHAR(50),
   customClothType VARCHAR(100),
   material VARCHAR(100),
   price DECIMAL(10, 2),
   description TEXT,
   imagePath VARCHAR(255),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- tailor add design schema
-- Assuming you already have a tailors table

-- Create designs table
-- For common design details
CREATE TABLE designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tailor_id INT,
    title VARCHAR(255) NOT NULL,
    delivery_time VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tailor_id) REFERENCES tailors(id) ON DELETE CASCADE
);

-- For blouse designs
CREATE TABLE blouse_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    material VARCHAR(255),
    FOREIGN KEY (design_id) REFERENCES designs(id) ON DELETE CASCADE
);

-- For full cloth designs (upper and lower side)
CREATE TABLE full_cloth_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT,
    upper_side_name VARCHAR(255),
    upper_side_size VARCHAR(50),
    upper_side_price DECIMAL(10, 2),
    upper_side_material VARCHAR(255),
    lower_side_name VARCHAR(255),
    lower_side_size VARCHAR(50),
    lower_side_price DECIMAL(10, 2),
    lower_side_material VARCHAR(255),
    FOREIGN KEY (design_id) REFERENCES designs(id) ON DELETE CASCADE
);

-- Update full cloth designs table to store the total price
CREATE TABLE full_cloth_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT,
    upper_side_name VARCHAR(255),
    upper_side_size VARCHAR(50),
    upper_side_material VARCHAR(255),
    lower_side_name VARCHAR(255),
    lower_side_size VARCHAR(50),
    lower_side_material VARCHAR(255),
    total_price DECIMAL(10, 2),  -- Single field for total price
    FOREIGN KEY (design_id) REFERENCES designs(id) ON DELETE CASCADE
);


-- For half cloth designs
CREATE TABLE half_cloth_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT,
    name VARCHAR(255),
    size VARCHAR(50),
    price DECIMAL(10, 2),
    material VARCHAR(255),
    FOREIGN KEY (design_id) REFERENCES designs(id) ON DELETE CASCADE
);

-- For storing design photos
CREATE TABLE design_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT,
    photo_path VARCHAR(255),
    FOREIGN KEY (design_id) REFERENCES designs(id) ON DELETE CASCADE
);


CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    designId INT,  -- References the design selected
    fabricId INT,  -- References the fabric(s) selected for the design
    quantity DECIMAL(5, 2),  -- Quantity of fabric in meters
    totalPrice DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (designId) REFERENCES designs(id),
    FOREIGN KEY (fabricId) REFERENCES fabrics(id)
);



-- not uses-- 



CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique ID for the cart entry
    userId INT NOT NULL,                                -- User ID (assumes users can have carts)
    designId INT NOT NULL,                              -- Design ID (references a design)
    fabricId INT NOT NULL,                              -- Fabric ID (references a fabric)
    quantity INT DEFAULT 1,                             -- Quantity of the fabric
    totalPrice DECIMAL(10, 2) NOT NULL,                 -- Total price for this cart entry (design + fabric price * quantity)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      -- Timestamp when the cart item was added
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp when the cart item was last updated
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,           -- Foreign key to the users table
    FOREIGN KEY (designId) REFERENCES designs(id) ON DELETE CASCADE,       -- Foreign key to the designs table
    FOREIGN KEY (fabricId) REFERENCES fabrics(id) ON DELETE CASCADE        -- Foreign key to the fabrics table
);




CREATE TABLE cart_items (
   id INT AUTO_INCREMENT PRIMARY KEY,
   userId INT,  -- Link to logged-in user
   designId INT,
   fabricId INT,
   quantity DECIMAL(10, 2),  -- Quantity in meters
   totalPrice DECIMAL(10, 2),
   status VARCHAR(50) DEFAULT 'pending',  -- 'pending' until checkout
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
