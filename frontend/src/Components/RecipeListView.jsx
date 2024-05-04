import React, { useContext } from "react";

import RecipeList from "./RecipeList";
import { applicationContext } from '../hooks/applicationContext';


import { Box, Typography } from "@mui/material";

function RecipeListView() {

  const { state } = useContext(applicationContext);
  const { recipes } = state;



  return (
    <Box sx={{ width: 0.43, height: 512 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginRight: 4.2, marginBottom: 0.5 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
        >
          &#8226; saved recipes
        </Typography>
      </Box>

      {recipes.length > 0 ? (
        <RecipeList />
      ):(
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", my: 2 }}
        >
          No recipes found.
        </Typography>
      )}

    </Box>
  );
}

export default RecipeListView;
