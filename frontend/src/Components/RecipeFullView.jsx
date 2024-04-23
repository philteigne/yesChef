import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";


function RecipeFullView() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = 1;
  const recipeId = 2;
  
  useEffect(() => {
    fetch(`/api/saved-recipes/user/${userId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      setRecipes(data);
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });
  }, [userId]);
  const recipe = recipes[1];

  useEffect(() => {
    fetch(`/api/ingredients/recipe/${recipeId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      setIngredients(data)
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });
  }, [recipeId]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  if (!recipe) return <div>No recipe found</div>;


return (
<Box sx={{ margin: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          {recipe.title} - {recipe.tags}
        </Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
            Button 1
          </Button>
          <Button variant="contained" color="secondary" sx={{ marginRight: '10px' }}>
            Button 2
          </Button>
          <Button variant="contained" color="error">
            Button 3
          </Button>
        </Box>
      </Box>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {Array.isArray(ingredients) ? ingredients.map(ing => `${ing.name} - ${ing.quantity} ${ing.units}`).join(', ') : "No ingredients"}
        </Typography>
      </Paper>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {recipe.steps}
        </Typography>
      </Paper>
    </Box>);

}

export default RecipeFullView