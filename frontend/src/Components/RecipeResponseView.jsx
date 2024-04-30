import React, { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import { applicationContext } from "../hooks/applicationContext";

function RecipeResponseView() {
  const { state } = useContext(applicationContext);

  if (!state.recipeResponse) return null;

  return (
    <Box sx={{ margin: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2">
          {state.recipeResponse.title} - {state.recipeResponse.tags.join(', ')}
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
          {state.recipeResponse.ingredients.map(ing => `${ing.ingredient} - ${ing.quantity} ${ing.units}`).join(', ')}
        </Typography>
      </Paper>
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2 }}>
        <Typography variant="body1" component="div">
          {state.recipeResponse.steps}
        </Typography>
      </Paper>
    </Box>
  );
}

export default RecipeResponseView;
