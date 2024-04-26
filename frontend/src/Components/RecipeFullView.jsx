import React, { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import { applicationContext } from "../hooks/applicationContext";
import Loading from "./Loading";
import Error from "./Error";

function RecipeFullView() {


  const { state } = useContext(applicationContext);

  const { activeRecipe, recipes, recipeIngredients, isLoading, error } = state;

  const recipe = recipes.find(r => r.id === activeRecipe);

  
  if (isLoading) return <Loading />
  if (error) return <Error />
  
  if (!recipe) return <div>No recipe found</div>;


return (
<Box sx={{ margin: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          {recipe.title} - {recipe.tags}
        </Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
            Button 1
          </Button>
          <Button variant="contained" color="secondary" sx={{ marginRight: '10px' }}>
            Button 2
          </Button>
          <Button variant="contained" color="error">
            Button 3
          </Button>
        </Box>
      </Box>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {Array.isArray(recipeIngredients) ? recipeIngredients.map(ing => `${ing.name} - ${ing.quantity} ${ing.units}`).join(', ') : "No ingredients"}
        </Typography>
      </Paper>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {recipe.steps}
        </Typography>
      </Paper>
    </Box>);

}

export default RecipeFullView