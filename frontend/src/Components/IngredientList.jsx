import React, { useContext } from 'react';

import IngredientListItem from './IngredientListItem';
import { applicationContext } from '../hooks/applicationContext';

import { Box } from '@mui/material';

const IngredientList = () => {

  const { state } = useContext(applicationContext)

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