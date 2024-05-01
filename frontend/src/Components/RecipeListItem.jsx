import React, { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import { ListItem, Typography, IconButton, Box } from '@mui/material'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const RecipeListItem = ({recipe}) => {

  const themeColors = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  }

  const { dispatch } = useContext(applicationContext);

  return (
    <Box sx={{
      flexGrow: 1,
      width: 0.90,
      maxWidth: 0.90,
      maxHeight: 43,
      border: '2px solid',
      borderColor: themeColors.textColor,
      borderRadius: '10px',
      overflow: 'hidden',
      m: 0.6
    }}>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => dispatch({type: 'SET_ACTIVE_RECIPE', payload: recipe.id})}
          >
            <RemoveCircleOutlineRoundedIcon color="secondary" />
          </IconButton>
        }
      >
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