import React, { useContext } from 'react';

import { Box, Typography, IconButton, Avatar } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import { applicationContext } from '../hooks/applicationContext';

import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';

const Pantry = () => {

  const { state } = useContext(applicationContext);
  
  return (
    <Box sx={{ width: 0.43 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginRight: 4.2, marginBottom: 0.5 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
        >
          &#8226; pantry
        </Typography>

        {/* Categories button toggle between categories and all views */}
        <IconButton>
          <Avatar sx={{ bgcolor: state.themeColors.accentColor }}>
            <FolderRoundedIcon
              fontSize="small"
              sx={{ fill: state.themeColors.bgColor}}
            />
          </Avatar>
        </IconButton>
      </Box>

      <IngredientList />

      <Typography
        variant="h1"
        component="h1"
        color="primary"
        sx={{ marginTop: 2, marginBottom: 0.5 }}
      >
        &#8226; add an ingredient
      </Typography>
      <AddIngredient />
    </Box>
  )
}

export default Pantry;
