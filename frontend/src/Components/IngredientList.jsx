import React, { useContext } from 'react';
import IngredientListItem from './IngredientListItem';
import { List, Box } from '@mui/material';
import { applicationContext } from '../hooks/applicationContext';

const IngredientList = () => {

  const { state } = useContext(applicationContext)
  console.log("state", state)

  return(
    <Box sx={{ display: 'flex', flexWrap:'wrap', height: '300px', overflow: "auto" }}>
        {state.ingredientList.map((ingredient) => {
          return(
            <IngredientListItem
              ingredient={ingredient}
              key={ingredient.id}
              sx={{ width: '100%' }}
            />
          )
        })}
    </Box>
  )
}

export default IngredientList;