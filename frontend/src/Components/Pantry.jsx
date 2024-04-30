import React from 'react';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';

import { Box, Typography, IconButton, Avatar } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

const Pantry = () => {
  
  return (
    <Box sx={{ width: 0.43 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginRight: 4.2, marginBottom: 0.5 }}>
        <Typography variant="h1" component="h1" color="primary">&#8226; pantry</Typography>

        {/* Categories button toggle between categories and all views */}
        <IconButton size='small' sx={{p: 0.5}}>
          <Avatar sx={{ bgcolor: "#E85A4F", p: 0, height: 30, width: 30 }}>
            <FolderRoundedIcon fontSize="20" sx={{ fill: "#EAE7DC"}}/>
          </Avatar>
        </IconButton>
      </Box>

      <IngredientList />

      <Typography variant="h1" component="h1" color="primary" sx={{ marginTop: 2, marginBottom: 0.5 }}>&#8226; add an ingredient</Typography>
      <AddIngredient />
    </Box>
  )
}

export default Pantry;
