const bcrypt = require('bcrypt');

const password = 'Mohan@121'; // Password to hash
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    console.log('Hashed Password:', hashedPassword);
});
