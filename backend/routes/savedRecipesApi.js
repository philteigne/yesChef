const express = require('express');
const router  = express.Router();
const { getSavedRecipes } = require('../db/queries/users');



router.get('/:userId', (req, res) => {
  // return all saved recipes with a user_id that matches the current users id
  const userId = req.params.userId;

  getSavedRecipes(userId)
  .then(recipes => {
    res.json(recipes);
  })
  .catch(error => {
    console.error('Error fetching saved recipes:', error);
    res.status(500).json({ error: "Internal server error" });
  });

});

router.post('/:userId/:recipe_id', (req,res) => {
  // Add a new recipe entry with user_id that matches current users id and selected recipe data
})

router.get('/:userId/:recipeId', (req, res) => {
  // View saved recipe item with an id that matches recipe_id

  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  const mockRecipe = {
    id: 2,
    title: "Avocado Toast",
    tags: ["Breakfast", "Healthy"],
    ingredients: ["2 slices whole grain bread", "1 ripe avocado", "1 small tomato, sliced", "Salt and black pepper to taste"],
    steps: ["Toast bread", "Mash avocado", "spread on bread"]
  }

  res.json(mockRecipe)
})

router.put('/:userId/:recipeId', (req, res) => {
  // Alter characteristics of a recipe

  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
})

router.delete('/:userId/:recipeId', (req, res) => {
  // Delete saved recipe from saved recipe list
})

module.exports = router;
