import React, { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import { ListItem, ListItemText, IconButton, Box, ThemeProvider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../styles/mui-themes'



const IngredientListItem = ({ingredient}) => {

  const { dispatch } = useContext(applicationContext);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        flexGrow: 1,
        maxWidth: 0.4,
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
        m: 1
      }}>
      <ListItem
        variant="contained"
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => dispatch({type: "DELETE_INGREDIENTS_USER", payload: ingredient.id})}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
        primary={ingredient.name}
        />
      </ListItem>
      </Box>
    </ThemeProvider>
  )
}

export default IngredientListItem;