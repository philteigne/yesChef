import React, { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import { ListItem, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
        borderColor: state.themeColors.textColor,
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
      >
        <Typography variant="h2" component="h2">
          {recipe.title}
        </Typography>
      </ListItem>
      <IconButton aria-label="delete" onClick={() => dispatch({ type: 'DELETE_RECIPE', payload: recipe.id })}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default RecipeListItem;
