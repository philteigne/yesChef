const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getUser } = require('../db/queries/users');

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // getUser takes in email and it returns {id: , password: }

  getUser(email)
    .then((data) => {

      if (!data) {
        // user is not in database
        return;
      }

      if (data.password === password) {
        // send userId
        res.send(data.id)
      }
    })
})

module.exports = router;
