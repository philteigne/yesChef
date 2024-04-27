import React from 'react';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';
import { Box, Typography, Divider } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

const Pantry = () => {
  
  return (
    <Box sx={{ margin: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', width: 0.5 }}>
      
      <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row'}}>
        <Typography variant="h4" component="h2">Pantry</Typography>

      {/* Categories button toggle between categories and all views */}
        <CategoryIcon />
      </Box>

      <IngredientList />
      <Divider>Add Ingredient</Divider>
      <AddIngredient />
    </Box>
  )
}

export default Pantry;
