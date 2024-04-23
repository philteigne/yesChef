import React from "react";
import '../styles/IngredientListItem.scss';

import { ListItem, ListItemText, IconButton, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';


const IngredientListItem = ({ingredient, deleteIngredient}) => {


  return (
    <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => deleteIngredient(ingredient)}>
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