import React, { useContext } from 'react'

import RecipeListItem from './RecipeListItem';
import { applicationContext } from '../hooks/applicationContext';

import { Box } from '@mui/material';

const RecipeList = () => {

  const { state } = useContext(applicationContext)
  const { recipes } = state;
  console.log("recipes", recipes)

  return(
    <Box sx={{ display:'block', height: 1, overflow: "auto" }}>
        {recipes.map((recipe) => {
          return(
            <RecipeListItem
              recipe={recipe}
              key={recipe.id}
              sx={{ width: '100%' }}
            />
          )
        })}
    </Box>
  )

}

export default RecipeList;