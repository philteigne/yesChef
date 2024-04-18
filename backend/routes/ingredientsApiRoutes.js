const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:userId', (req, res) => {
  // Retrieve list of users ingredients list

  const userId = req.params.userId;

  const mockIngredients = [
    "pasta",
    "chicken",
    "pesto",
    "tomato paste"
  ];

  res.json(mockIngredients);

});

router.post('/:userId', (req, res) => {
  // Add a new ingredient to the users saved list
  const userId = req.params.userId;
  
})

router.put('/:userId/:ingredientId', (req, res) => {
  // Change the name of a users stored ingredient

  const userId = req.params.userId;
  const ingredientId = req.params.ingredientId;


})

router.delete('/:userId/:ingredientId', (req, res) => {
  const userId = req.params.userId;
  const ingredientId = req.params.ingredientId;

  // Delete saved ingredient from users ingredients list
})

module.exports = router;
