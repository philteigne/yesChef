import React, { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { applicationContext } from "../hooks/applicationContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';

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

  return (
    <Box sx={{ 
      margin: 2, 
      border: '1px solid #ccc', 
      borderRadius: '4px', 
      overflow: 'hidden',
      width: '0.43'
      }}>
    
      <Box sx={{ padding: 0, display: 'flex', alignItems: 'center' }}> 
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          endIcon={<FavoriteIcon/>}
          sx={{ minWidth: 'auto', marginRight: 1 }}
        >
          Save
        </Button>
        <Button
          type="submit"
          onClick={""}
          variant="contained"
          endIcon={<RefreshIcon/>}
          sx={{ minWidth: 'auto', marginRight: 1 }}
        >
          Regenerate
        </Button>
        <Button
          type="submit"
          onClick={handleClear}
          variant="contained"
          endIcon={<ClearIcon/>}
          sx={{ minWidth: 'auto', marginRight: 1 }}
        >
          Clear
        </Button>
      </Box>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2"
          component="h2"
          color="primary">
          {state.recipeResponse.title} - {state.recipeResponse.tags.join(', ')}
        </Typography>
      </Box>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="h2" component="h2" color="secondary">
          {state.recipeResponse.ingredients.map(ing => `${ing.ingredient} - ${ing.quantity} ${ing.units}`).join(', ')}
        </Typography>
      </Paper>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
      {state.recipeResponse.steps.map((step) => {
        return (
          <Typography 
          variant="h2"
          component="h2"
          color="secondary" 
          sx={{ marginTop: 1, marginBottom: 1 }}
          >
            {step}
          </Typography>
        )
      })}
      </Paper>
    </Box>
  );
}

export default RecipeResponseView;
