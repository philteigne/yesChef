import React from 'react';

import { Box, Typography, Paper } from '@mui/material';

const RecipeOutput = ({recipe}) => {
  return (
    <Box sx={{overflow: 'auto', height: '474px', ml: 1}}>
        {/*RECIPE TITLE AND TAGS*/}
        
        <Typography variant="h2" component="h2" data-testid="recipe-title">
          {recipe.title}
        </Typography>
        <Typography variant="body2" component="p" data-testid="recipe-tags">
          {recipe.tags.join(', ')}
        </Typography>

        <Paper sx={{ margin: 'auto', mb: 2, padding: 1, pr: 1 }}>
          {/*RECIPE INGREDIENTS*/}
          {recipe.ingredients.map((ing, i) => {
            return(
              <Typography key={i} variant="body2" component="p">
                &#8226; {ing.name} - {ing.quantity} {ing.units}
              </Typography>
            )
          })}
          {/*RECIPE STEPS*/}
          {recipe.steps.map((step, i) => {
            return (
              <Typography 
                variant="body2"
                component="p" 
                key={i}
                sx={{ marginTop: 1, marginBottom: 1 }}
              >
                {step}
              </Typography>
            )
          })}
        </Paper>
      </Box>
  )
}

export default RecipeOutput;