import React, { useContext } from 'react';

import { applicationContext } from '../hooks/applicationContext';

import { ListItem, Typography, Box } from '@mui/material'

const RecipeListItem = ({recipe}) => {

  const { state, dispatch } = useContext(applicationContext);

  return (
    <Box sx={{
      flexGrow: 1,
      width: 0.90,
      maxWidth: 0.90,
      maxHeight: 43,
      border: '2px solid',
      borderColor: state.themeColors.textColor,
      borderRadius: '10px',
      overflow: 'hidden',
      m: 0.6
    }}>
      <ListItem onClick={() => dispatch({type: 'SET_ACTIVE_RECIPE', payload: recipe.id})}>
        <Typography
          variant="h2"
          component="h2"
        >
          {recipe.title}
        </Typography>
      </ListItem>
    </Box>
  )
}

export default RecipeListItem;