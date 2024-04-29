import React from 'react';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';

import { Box, Typography } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

const Pantry = () => {
  
  return (
    <Box sx={{ margin: 2, overflow: 'hidden', width: 0.43 }}>
      
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row'}}>
        <Typography variant="h1" component="h1" color="primary">&#8226; pantry</Typography>

        {/* Categories button toggle between categories and all views */}
        <FolderRoundedIcon />
      </Box>

      <IngredientList />

      <Typography variant="h1" component="h1" color="primary">&#8226; add an ingredient</Typography>
      <AddIngredient />
    </Box>
  )
}

export default Pantry;
