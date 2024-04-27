import React, { useState, useContext } from "react";
import { applicationContext } from '../hooks/applicationContext';
import { TextField, Button, Box, Stack, Typography } from '@mui/material';

const Parameters = () => {

  const { dispatch, state } = useContext(applicationContext)

  const [recipeTags, setRecipeTags] = useState('')
  const [recipeFocus, setRecipeFocus] = useState('')
  const [recipeAvoid, setRecipeAvoid] = useState('')

  const handleSubmit = () => {
    const recipeRequest = {
      allIngredients: state.ingredientList,
      recipeTags: recipeTags,
      recipeFocus: recipeFocus,
      recipeAvoid: recipeAvoid,
    }

    // Dispatch action to add ingredient
    dispatch({ type: "REQUEST_RECIPE", payload: recipeRequest });

    // Clear input values
    setRecipeTags('');
    setRecipeFocus('');
    setRecipeAvoid('');
  }

  return(
    <Stack
      direction="column"
      justifyContent="center"
      width="0.5"
    >
      <Box sx={{ marginBottom: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
        
        <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row'}}>
          <Typography variant="h4" component="h2">Parameters</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, maxWidth: 1, p: 3 }}>
          <Stack
            direction="column"
            spacing={1}
          >
            <TextField
              variant="outlined"
              label="Recipe Tags"
              value={recipeTags}
              onChange={(e) => setRecipeTags(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Showcase Ingredients"
              value={recipeFocus}
              onChange={(e) => setRecipeFocus(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Avoid Ingredients"
              value={recipeAvoid}
              onChange={(e) => setRecipeAvoid(e.target.value)}
            />
          </Stack>
        </Box>
      </Box>

      <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
      >
        Submit
      </Button>
    </Stack>


  )
}

export default Parameters;