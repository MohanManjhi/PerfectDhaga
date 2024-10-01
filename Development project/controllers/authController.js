const bcrypt = require('bcryptjs');
const { createUser  } = require('../models/userModel');
const { createTailor } = require('../models/tailorModel');
const { createVendor } = require('../models/vendorModel');

const registerUser  = async (req, res) => {
    const { role, name, email, phone, password, address, experience, specialization, portfolio, company_name, business_type, tax_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        if (role === 'user') {
            const userData = { name, address, email, phone, password: hashedPassword };
            await createUser (userData);
        } else if (role === 'tailor') {
            const tailorData = { name, experience, specialization, portfolio, email, phone, password: hashedPassword };
            await createTailor(tailorData);
        } else if (role === 'vendor') {
            const vendorData = { name, company_name, business_type, tax_id, email, phone, password: hashedPassword };
            await createVendor(vendorData);
        }
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { registerUser  };