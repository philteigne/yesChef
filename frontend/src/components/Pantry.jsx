import React from 'react';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';
import '../styles/Pantry.scss';

import { Box, Stack } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';


const Pantry = ({ingredientListTest, deleteIngredient, addIngredient}) => {
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
