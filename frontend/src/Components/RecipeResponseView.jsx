import React, { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { applicationContext } from "../hooks/applicationContext";

function RecipeResponseView() {
  const { state, dispatch } = useContext(applicationContext);

  const handleSubmit = () => {
    if (!state.recipeResponse) {
      console.error("No recipe data to save.");
      return;
    }
  
    // Dispatch an action that includes the recipe data to be saved
    dispatch({
      type: "SAVE_RECIPE",
      payload: { userId: state.userId, recipe: state.recipeResponse }
    });
  };

  const handleClear = () => {
    // use dispatch to clear the recipeResponse state back to null on click
    dispatch({type: "CLEAR_RECIPE_RESPONSE"});

  }

  if (!state.recipeResponse) return null;

  return (
    <Box sx={{ margin: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          {state.recipeResponse.title} - {state.recipeResponse.tags.join(', ')}
        </Typography>
        <Box>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
          >
            Save Recipe
          </Button>
          <Button
            type="submit"
            onClick={handleClear}
            variant="contained"
          >
            Clear Recipe
          </Button>
        </Box>
      </Box>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {state.recipeResponse.ingredients.map(ing => `${ing.ingredient} - ${ing.quantity} ${ing.units}`).join(', ')}
        </Typography>
      </Paper>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {state.recipeResponse.steps}
        </Typography>
      </Paper>
    </Box>
  );
}

export default RecipeResponseView;
