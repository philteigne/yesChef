const path = require('path');
require('dotenv').config({ path: path.join(__dirname, `../.env`) });

const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there is no token

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid
    req.user = user;
    // req.user is a obj, it contains iat: and userId
    // user.userId, it decodes the jwt
    next();
  });
};

module.exports = authenticateToken
