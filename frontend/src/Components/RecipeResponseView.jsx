import React, { useContext } from "react";

import { Box, Typography, IconButton, Avatar, CircularProgress } from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';

import RecipeOutput from "./RecipeOutput";

import { applicationContext } from "../hooks/applicationContext";

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
    dispatch({ type: "CLEAR_RECIPE_SAVE_STATE" })
  }

  return (
    <Box data-testid="recipe-response-box" sx={{ 
      margin: 2,
      borderRadius: '4px', 
      width: '0.43'
      }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginRight: 4.2, marginBottom: 0.5 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
        >
          &#8226; recipe generation
        </Typography>

        {/* Recipe Generation Control */}
        <Box>
          <IconButton onClick={() => {if (!state.isRecipeSaved) {handleSave()}}}>
            <Avatar sx={{ bgcolor: !state.isRecipeSaved ? state.themeColors.accentColor : state.themeColors.textColor }}>
              {!state.isRecipeSaved && !state.saveRecipeLoading && <SaveIcon fontSize="small" sx={{ fill: state.themeColors.bgColor}}/>}
              {state.isRecipeSaved && <DoneIcon fontSize="small" sx={{ fill: state.themeColors.bgColor}}/>}
              {state.saveRecipeLoading && <CircularProgress size={16} sx={{color: state.themeColors.bgColor}} />}
            </Avatar>
          </IconButton>

          <IconButton>
            <Avatar sx={{ bgcolor: state.themeColors.accentColor }}>
              <RefreshIcon
                onClick={handleRegenerate}
                fontSize="small"
                sx={{ fill: state.themeColors.bgColor}}
              />
            </Avatar>
          </IconButton>

          <IconButton>
            <Avatar sx={{ bgcolor: state.themeColors.accentColor }}>
              <ClearIcon
                onClick={handleClear}
                fontSize="small"
                sx={{ fill: state.themeColors.bgColor}}
              />
            </Avatar>
          </IconButton>
        </Box>
      </Box>
      <RecipeOutput recipe={state.recipeResponse}/>
    </Box>
  );
}

export default RecipeResponseView;
