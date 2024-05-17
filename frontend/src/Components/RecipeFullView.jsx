import React, { useContext } from "react";

import { Box, Typography, IconButton, Avatar, Icon } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import MascotAssistant from "../icons/MascotAssistant";

import RecipeOutput from "./RecipeOutput";

import { applicationContext } from "../hooks/applicationContext";


function RecipeFullView() {

  const { state } = useContext(applicationContext);
  
  const { activeRecipe, recipes, recipeIngredients } = state;
  
  const recipe = recipes.find(r => r.id === activeRecipe);
  
  if (recipe) {
    if (!Array.isArray(recipe.tags)) {
      recipe.tags = recipe.tags.split(', ')
    }
    if (!Array.isArray(recipe.steps)) {
      recipe.steps = recipe.steps.split(/(?=\b\d+\.\s)/).map(a => a.trim())
    }
    recipe.ingredients = recipeIngredients
  }

  return (
    <Box sx={{ 
      margin: 2,
      borderRadius: '4px', 
      width: '0.43',
      }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginRight: 4.2, marginBottom: 0.5 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
        >
          &#8226; recipe viewer
        </Typography>

        {/* Recipe Generation Control */}
        <Box>
          <IconButton>
            <Avatar sx={{ bgcolor: state.themeColors.accentColor }}>
              <EditIcon
                fontSize="small"
                sx={{ fill: state.themeColors.bgColor}}
              />
            </Avatar>
          </IconButton>
        </Box>
      </Box>

      {recipe &&
        <RecipeOutput recipe={recipe} />
      }
      {!recipe &&
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
          <Typography variant="h2" sx={{marginTop: 3, marginBottom: 3}}>
            Please select or create a recipe!
          </Typography>
          <Icon sx={{ height: 300, width: 300 }}>
            <MascotAssistant />
          </Icon>
        </Box>
      }
    </Box>
  )
}

export default RecipeFullView