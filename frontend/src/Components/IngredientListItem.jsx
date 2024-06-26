import React, { useContext } from 'react';

import { ListItem, Typography, IconButton, Box } from '@mui/material'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

import { applicationContext } from '../hooks/applicationContext';

const IngredientListItem = ({ingredient}) => {

  const { state, dispatch } = useContext(applicationContext);

  return (
    <Box data-testid='ingredientListItem-container' sx={{
      flexGrow: 1,
      width: 0.48,
      maxWidth: 0.48,
      height: 43,
      maxHeight: 43,
      border: '2px solid',
      borderColor: state.themeColors.textColor,
      borderRadius: '10px',
      overflow: 'hidden',
      m: 0.6
    }}>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => dispatch({type: "DELETE_INGREDIENTS_USER", payload: ingredient.id})}
            data-testid="delete-ingredient-btn"
          >
            <RemoveCircleOutlineRoundedIcon color="secondary" />
          </IconButton>
        }
      >
        <Typography
          variant="h2"
          component="h2"
        >
          {ingredient.name}
        </Typography>
      </ListItem>
      
    </Box>
  )
}

export default IngredientListItem;