const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getUser } = require('../db/queries/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname,'../.env' )});

router.post('/', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Call getUser function to retrieve user data
    const user = await getUser(email);

    if (!user) {
      // User not found in database
      return res.status(400).json({ message: 'Email or password does not match' });
    }

    // Compare passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      // Passwords do not match
      return res.status(400).json({ message: 'Email or password does not match' });
    }
    console.log(process.env.JWT_SECRET_KEY);

    const jwtToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY);

    // Return response with JWT token
    return res.status(200).json({ message: 'Welcome back', token: jwtToken, id: user.id });
  } catch (error) {
    console.error('Error occurred during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
