const bcrypt = require('bcryptjs');
const { createUser , findUserByEmailOrPhone } = require('../models/userModel');
const { createTailor, findTailorByEmailOrPhone } = require('../models/tailorModel');
const { createVendor, findVendorByEmailOrPhone } = require('../models/vendorModel');

const registerUser  = async (req, res) => {
    const { role, name, email, phone, password, address, experience, specialization, portfolio, company_name, business_type, tax_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        // Check for duplicate email or phone across all tables
        const existingUser  = await findUserByEmailOrPhone(email, phone);
        const existingTailor = await findTailorByEmailOrPhone(email, phone);
        const existingVendor = await findVendorByEmailOrPhone(email, phone);

        if (existingUser  || existingTailor || existingVendor) {
            return res.status(400).json({ error: 'duplicate' });
        }

        // Create new user based on role
        if (role === 'user') {
            const userData = { name, address, email, phone, password: hashedPassword };
            await createUser (userData);
        } else if (role === 'tailor') {
            const tailorData = { name, experience, specialization, portfolio, email, phone, password: hashedPassword };
            await createTailor(tailorData);
        } else if (role === 'vendor') {
            const vendorData = { 
                name, 
                company_name: company_name || null, 
                business_type: business_type || null, 
                tax_id: tax_id || null, 
                email, 
                phone, 
                password: hashedPassword 
            };
            await createVendor(vendorData);
        }
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser  = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        // Check for user in all tables
        const user = await findUserByEmailOrPhone(emailOrPhone, emailOrPhone);
        const tailor = await findTailorByEmailOrPhone(emailOrPhone, emailOrPhone);
        const vendor = await findVendorByEmailOrPhone(emailOrPhone, emailOrPhone);

        let foundUser  = user || tailor || vendor;
        let role;

        if (user) {
            role = 'user';
        } else if (tailor) {
            role = 'tailor';
        } else if (vendor) {
            role = 'vendor';
        }

        if (!foundUser ) {
            return res.status(400).json({ error: 'Invalid email or phone' });
        }

        const isMatch = await bcrypt.compare(password, foundUser .password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Return role for client-side redirection
        res.json({ role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { registerUser , loginUser  };

// const bcrypt = require('bcryptjs');
// const { createUser , findUserByEmailOrPhone } = require('../models/userModel');
// const { createTailor, findTailorByEmailOrPhone } = require('../models/tailorModel');
// const { createVendor, findVendorByEmailOrPhone } = require('../models/vendorModel');

// const registerUser  = async (req, res) => {
//     const { role, name, email, phone, password, address, experience, specialization, portfolio, company_name, business_type, tax_id } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 12);

//     try {
//         // Check for duplicate email or phone across all tables
//         const existingUser  = await findUserByEmailOrPhone(email, phone);
//         const existingTailor = await findTailorByEmailOrPhone(email, phone);
//         const existingVendor = await findVendorByEmailOrPhone(email, phone);

//         if (existingUser  || existingTailor || existingVendor) {
//             return res.status(400).json({ error: 'duplicate' });
//         }

//         // Create new user based on role
//         if (role === 'user') {
//             const userData = { name, address, email, phone, password: hashedPassword };
//             await createUser (userData);
//         } else if (role === 'tailor') {
//             const tailorData = { name, experience, specialization, portfolio, email, phone, password: hashedPassword };
//             await createTailor(tailorData);
//         } else if (role === 'vendor') {
//             const vendorData = { 
//                 name, 
//                 company_name: company_name || null, 
//                 business_type: business_type || null, 
//                 tax_id: tax_id || null, 
//                 email, 
//                 phone, 
//                 password: hashedPassword 
//             };
//             await createVendor(vendorData);
//         }
//         res.status(201).json({ message: 'Registration successful!' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// const loginUser  = async (req, res) => {
//     const { emailOrPhone, password } = req.body;

//     try {
//         // Check for user in all tables
//         const user = await findUserByEmailOrPhone(emailOrPhone, emailOrPhone);
//         const tailor = await findTailorByEmailOrPhone(emailOrPhone, emailOrPhone);
//         const vendor = await findVendorByEmailOrPhone(emailOrPhone, emailOrPhone);

//         let foundUser  = user || tailor || vendor;
//         let role;

//         if (user) {
//             role = 'user';
//         } else if (tailor) {
//             role = 'tailor';
//         } else if (vendor) {
//             role = 'vendor';
//         }

//         if (!foundUser ) {
//             return res.status(400).json({ error: 'Invalid email or phone' });
//         }

//         const isMatch = await bcrypt.compare(password, foundUser .password);

//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid password' });
//         }

//         // Return role for client-side redirection
//         res.json({ role });
//     } catch (error) {
//         console.error ('Error logging in:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = { registerUser , loginUser  };
