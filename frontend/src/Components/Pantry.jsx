import React from 'react';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';

import { Box, Stack } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { applicationContext } from '../hooks/applicationContext';
import { useContext } from 'react';

const Pantry = () => {
  // put
  const {ingredientListTest, deleteIngredient, addIngredient} = useContext(applicationContext)

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        useFlexGap
      >
        <h2>Pantry</h2>

        {/* Categories button toggle between categories and all views */}
        <CategoryIcon />
      </Stack>
      <IngredientList ingredientListTest={ingredientListTest} deleteIngredient={deleteIngredient}/>
      <AddIngredient ingredientListTest={ingredientListTest} addIngredient={addIngredient} />
    </Box>
  )
}

export default Pantry;
