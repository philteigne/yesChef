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
import useApplicationData from "../hooks/customHook";


function RecipeFullView() {
  const { recipes, fetchRecipes,recipeIngredients, fetchIngredients, isLoading, error } = useApplicationData();



  const userId = 1;
  const recipeId = 2;

  useEffect(() => {
    fetchRecipes(userId);
  }, [fetchRecipes, userId]);
  
  useEffect(() => {
    fetchIngredients(recipeId);
  }, [fetchIngredients, recipeId])

  const recipe = recipes[1];


  
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
          {Array.isArray(recipeIngredients) ? recipeIngredients.map(ing => `${ing.name} - ${ing.quantity} ${ing.units}`).join(', ') : "No ingredients"}
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