const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getSavedRecipes = (userID) => {
  const queryText = 'SELECT * FROM recipes WHERE saved_by = $1;';
  return db.query(queryText, [userID])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

const addRecipe = (userId, selectedRecipe) => {
  // Add a new recipe entry with user_id
}

const getRecipeById = (recipeId) => {
  // View saved recipe item with an id that matches recipe_id
}

const changeRecipe = () => {
  // Alter characteristics of a recipe
}

const deleteRecipe = (recipeId) => {
  // Delete saved recipe from saved recipe list
}

const getUserIngredients = (userId) => {
  // Retrieve list of users ingredients list
}

const addIngredient = (userId, ingredient) => {
  // Add a new ingredient to the users saved list
}

const editIngredientName = (userId, ingredientId) => {
  // Change the name of a users stored ingredient
}

const deleteIngredient = (userId, ingredientId) => {
  // Delete saved ingredient from users ingredients list
}
module.exports = { getUsers };
