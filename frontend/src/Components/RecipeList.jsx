import React, { useContext } from 'react'

import { Box } from '@mui/material';

import { applicationContext } from '../hooks/applicationContext';

import RecipeListItem from './RecipeListItem';

const RecipeList = () => {

  const { state } = useContext(applicationContext)
  const { recipes } = state;

  return(
    <Box sx={{ display:'block', height: 1, overflow: "auto" }} data-testid="recipe-list-container">
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