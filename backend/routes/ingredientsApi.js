const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getIngredients, getRecipeIngredients } = require('../db/queries/users');

router.get('/:userId', (req, res) => {
  // Retrieve list of users ingredients list
  const userId = req.params.userId;

  getIngredients(userId)
    .then(recipes => {
      res.json(recipes);
    })
    .catch(error => {
      console.error('Error fetching saved ingredients:', error);
      res.status(500).json({ error: "Internal server error" });
    });

});

router.get('/recipe/:recipeId', (req, res) => {
  // retrieve all ingredients for a given recipe
  const recipeId = req.params.recipeId;

  getRecipeIngredients(recipeId)
    .then(ingredients => {
      res.json(ingredients);
    })
    .catch(error => {
      console.error('Error fetching saved ingredients:', error);
      res.status(500).json({ error: "Internal server error" });
    });
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
