import React, { useContext } from 'react';
import IngredientListItem from './IngredientListItem';
import { List, Box } from '@mui/material';
import { applicationContext } from '../hooks/applicationContext';

const IngredientList = () => {

  const { state } = useContext(applicationContext)

  return(
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <List>
        {state.ingredientList.map((ingredient) => {
          return(
            <IngredientListItem ingredient={ingredient} key={ingredient.id}/>
          )
        })}
      </List>
    </Box>
  )
}

export default IngredientList;