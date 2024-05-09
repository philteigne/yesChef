const bcrypt = require('bcrypt');
// for route to handle sign up
// Hash a password
const saltRounds = 10;
const plaintextPassword = 'yeschef';
bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    // Store the hashed password in your database
    console.log('Hashed password:', hash);
  }
});
