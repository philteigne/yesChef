import React, { useContext } from "react";
import { Stack } from '@mui/material'; 

import { applicationContext } from "../hooks/applicationContext";
import Loading from "./Loading";
import Parameters from "./Parameters";
import RecipeResponseView from "./RecipeResponseView";
import Pantry from "./Pantry";

const CreateRecipe = () => {
  const { state } = useContext(applicationContext)

  return (
    <Stack
      direction="row"
      justifyContent='center'
      spacing={12}
    >
      <Pantry  />
      {state.isLoading && <Loading />}
      {!state.isLoading && !state.recipeResponse && <Parameters />}
      {!state.isLoading && state.recipeResponse && <RecipeResponseView />}
    </Stack>
  )
}

export default CreateRecipe;