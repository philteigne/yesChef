import React, { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { applicationContext } from "../hooks/applicationContext";
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function RecipeResponseView() {
  const { state, dispatch } = useContext(applicationContext);

  const handleSave = () => {
    if (!state.recipeResponse) {
      console.error("No recipe data to save.");
      return;
    }
    // changes state in saveRecipeData 
    // Dispatch an action that includes the recipe data to be saved
    dispatch({
      type: "SAVE_RECIPE",
      payload: { userId: state.userId, recipe: state.recipeResponse }
    })
    
    dispatch({type: "SET_SAVE_RECIPE_LOADING", payload: true})

   
  };

  const handleClear = () => {
    // use dispatch to clear the recipeResponse state back to null on click
    dispatch({type: "CLEAR_RECIPE_RESPONSE"});
    // clear temp parameter input
    dispatch({ type: "SET_TEMP_PARAMETER_INPUT", payload: null });
    // reset isSaved state
    dispatch({type: "SET_IS_RECIPE_SAVED", payload: false});

  }

  const handleRegenerate = () => {
    const { recipeTags, recipeFocus, recipeAvoid, allIngredients } = state.tempParameterInput;

    const quickRegenerateRequest = {
      recipeTags,
      recipeFocus,
      recipeAvoid,
      allIngredients,
      oldRecipeTitle: state.recipeResponse.title
    }

    dispatch({ type: "REQUEST_RECIPE", payload: quickRegenerateRequest });
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
        <LoadingButton
          size="small"
          color="secondary"
          onClick={handleSave}
          loading={state.saveRecipeLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ minWidth: 'auto', marginRight: 1 }}
        >
          <span>
            {state.isRecipeSaved ? 'Saved' : state.saveRecipeLoading ? 'Saving':'Save'}
          </span>
        </LoadingButton>

        <Button
          type="submit"
          onClick={handleRegenerate}
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
