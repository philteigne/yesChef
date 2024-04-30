const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getSavedRecipes = (userId) => {
  const queryText = 'SELECT * FROM recipes WHERE saved_by = $1;';
  return db.query(queryText, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

const addRecipe = (userId) => {
  // Add a new recipe entry with user_id
  const queryText = 'INSERT INTO recipes (saved_by, title, tags, steps) VALUES ($1, $2, $3, $4);'
  return db.query(queryText, [userId, state.recipeResponse.title, state.recipeResponse.tags, state.recipeResponse.steps])
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
    throw err;
  });
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

const getRecipeIngredients = (recipeId) => {
  const queryText = 'SELECT  i.name,  ri.quantity,  ri.units FROM  ingredients i JOIN  recipe_ingredients ri ON i.id = ri.ingredient_id WHERE ri.recipe_id = $1;';
  return db.query(queryText, [recipeId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
}

const getIngredients = (userId) => {
  // Get a list of all ingredients belonging to userId
  const queryText = `
  SELECT * FROM ingredients
  WHERE user_id = $1;
  `;

  console.log("Querying ingredients for", userId)
  return db.query(queryText, [userId])
    .then(data => data.rows)
    // .then((data) => console.log(data))
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

const deleteIngredient = (userId, ingredientId) => {
  // Delete saved ingredient from users ingredients list
  const queryText = `
  DELETE FROM ingredients
  WHERE user_id = $1
  AND id = $2;
  `;
  return db.query(queryText, [userId, ingredientId])
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

const addIngredient = (userId, ingredient) => {
  // Add a new ingredient to the users saved list
  const queryText = `
  INSERT INTO ingredients (user_id, name, quantity, units)
  VALUES ($1, $2, $3, $4);
  `;
  return db.query(queryText, [userId, ingredient.name, ingredient.quantity, ingredient.units])
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

const editIngredientName = (userId, ingredientId) => {
  // Change the name of a users stored ingredient
};

module.exports = {
  getSavedRecipes,
  getRecipeIngredients,
  getIngredients,
  deleteIngredient,
  addIngredient
};
