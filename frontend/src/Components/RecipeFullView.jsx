import React, { useContext } from "react";

import { applicationContext } from "../hooks/applicationContext";

import { Box, Typography, Paper, IconButton, ListItem, Avatar } from "@mui/material";
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

  if (recipe && !Array.isArray(recipe.steps)) {
    recipe.steps = splitRecipe(recipe.steps)
  }

  return (
    <Box sx={{ 
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
          <IconButton>
            <Avatar sx={{ bgcolor: state.themeColors.accentColor }}>
              <EditIcon
                fontSize="20"
                sx={{ fill: state.themeColors.bgColor}}
              />
            </Avatar>
          </IconButton>
        </Box>
      </Box>

      {recipe &&
        <Box sx={{overflow: 'auto', height: '474px', ml: 1}}>
          {/*RECIPE TITLE AND TAGS*/}
          <Typography variant="h2" component="h2">
            {recipe.title}
          </Typography>
          <Typography variant="body2" component="p">
            {recipe.tags}
          </Typography>
  
          <Paper sx={{ margin: 'auto', mb: 2, padding: 1, pr: 1 }}>
            {/*RECIPE INGREDIENTS*/}
            {recipeIngredients.map(ing => {
              return(
                <Typography variant="body2" component="p" key={ing.id}>
                  &#8226; {ing.name} - {ing.quantity} {ing.units}
                </Typography>
              )
            })}
            {/*RECIPE STEPS*/}
            {recipe.steps.map((step) => {
              return (
                <Typography 
                  variant="body2"
                  component="p" 
                  sx={{ marginTop: 1, marginBottom: 1 }}
                >
                  {step}
                </Typography>
              )
            })}
          </Paper>
        </Box>
      }
      {!recipe &&
        <Box sx={{ width: 0.43, display: 'flex', flexDirection: 'column'}}>
          <Typography variant="h2" sx={{marginTop: 3, marginBottom: 3}}>
            Please select or create a recipe!
          </Typography>
          <Box width='0.5'>
            <img src={kirby} alt="chef kirby holding a chocolate pie" style={{width: 'auto', height: '50%'}}></img>
          </Box>
        </Box>
      }
    </Box>
  )
}

export default RecipeFullView