import React, { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import { ListItem, ListItemText, IconButton, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const IngredientListItem = ({ingredient}) => {

  const { dispatch } = useContext(applicationContext);
  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => dispatch({type: "DELETE_INGREDIENTS_USER", payload: ingredient.id})}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={ingredient.name}
        />
      </ListItem>
    </Box>
  )
}

export default IngredientListItem;