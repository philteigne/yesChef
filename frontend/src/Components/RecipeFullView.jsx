import React, { useContext } from "react";

import { applicationContext } from "../hooks/applicationContext";

import { Box, Typography, Paper, IconButton, ListItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import kirby from '../assets/images/kirby-chocolate-pie.png';

function RecipeFullView() {

  const { state, dispatch } = useContext(applicationContext);
  
  const { activeRecipe, recipes, recipeIngredients } = state;
  
  const recipe = recipes.find(r => r.id === activeRecipe);
  
  function splitRecipe(recipe) {
    const arr = recipe.split(/\d+\./).filter(step => step.trim() !== '');
   return arr.map((step, index) => {
      return `${index + 1}.${step}`
    })
  }

  
  if (!recipe) {
    return (
      <Box sx={{ width: 0.43, display: 'flex', flexDirection: 'column'}}>
        <Typography
        variant="h1"
        component="h1"
        color="primary"
        >
          &#8226; recipe viewer
        </Typography>
        <Typography variant="h2" sx={{marginTop: 3, marginBottom: 3}}>
          Please select or create a recipe!
        </Typography>
        <Box>
          <img src={kirby} alt="chef kirby holding a chocolate pie" style={{width: 'auto', height: '70%'}}></img>
        </Box>
      </Box>
    )
    
  }

  return (
    <Box sx={{ width: 0.43}}>
      
      <Typography
        variant="h1"
        component="h1"
        color="primary"
      >
        &#8226; recipe viewer
      </Typography>
      
      <Box sx={{
        flexGrow: 1,
        width: 1,
        maxWidth: 1,
        height: 43,
        maxHeight: 43,
        border: '2px solid',
        borderColor: state.themeColors.textColor,
        borderRadius: '10px',
        overflow: 'hidden',
        m: 0.6
      }}>
        <ListItem
          sx={{alignItems: "center"}}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch({type: "EDIT_CURRENT_RECIPE", payload: recipe.id})}
            >
              <EditIcon color="primary" />
            </IconButton>
          }
        >
          <Typography
            variant="h2"
            component="h2"
          >
            {recipe.title} - {recipe.tags}
          </Typography>
        </ListItem>
      </Box>
        
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2, height: 1, overflow: 'auto' }}>
        <Typography
          variant="h2" component="h2" color="secondary"
        >
          {Array.isArray(recipeIngredients) ? recipeIngredients.map(ing => `${ing.name} - ${ing.quantity} ${ing.units} \n`).join(', ') : "No ingredients"}
        </Typography>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        {/* function to map steps by number and add line breaks */}
      {splitRecipe(recipe.steps).map((step) => {
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
      </Paper>

    </Box>
  )
}

export default RecipeFullView