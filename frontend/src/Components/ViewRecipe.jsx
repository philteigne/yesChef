import React from "react";
import { Stack } from '@mui/material'; 
import RecipeListView from "./RecipeListView";
import RecipeFullView from "./RecipeFullView";

const ViewRecipe = () => {

  return (
    <Stack
      direction="row"
      justifyContent='center'
      spacing={12}
      >
      <RecipeListView />
      <RecipeFullView />
    </Stack>
  )
} 

export default ViewRecipe;