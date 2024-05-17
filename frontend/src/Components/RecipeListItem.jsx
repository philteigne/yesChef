import React, { useContext } from 'react';

import { ListItem, Typography, Box, IconButton } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

import { applicationContext } from '../hooks/applicationContext';

const RecipeListItem = ({ recipe }) => {
  const { state, dispatch } = useContext(applicationContext);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: 0.9,
        maxWidth: 0.9,
        maxHeight: 43,
        border: '2px solid',
        borderColor: state.activeRecipe === recipe.id ? state.themeColors.accentColor : state.themeColors.textColor,
        borderRadius: '10px',
        overflow: 'hidden',
        m: 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ListItem
        onClick={() => dispatch({ type: 'SET_ACTIVE_RECIPE', payload: recipe.id })}
        data-testid="recipe-list-item"
      >
        <Typography variant="h2" component="h2">
          {recipe.title}
        </Typography>
      </ListItem>
      <IconButton aria-label="delete" onClick={() => dispatch({ type: 'DELETE_RECIPE', payload: recipe.id })}>
        <RemoveCircleOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default RecipeListItem;
