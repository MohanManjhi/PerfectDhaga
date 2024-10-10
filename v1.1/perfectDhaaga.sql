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