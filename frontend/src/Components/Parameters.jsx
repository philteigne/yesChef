import React, { useState, useContext } from "react";

import { applicationContext } from '../hooks/applicationContext';

import { TextField, Button, Box, Stack, Typography, Checkbox, FormControlLabel } from '@mui/material';

const Parameters = () => {

  const { dispatch, state } = useContext(applicationContext)

  const [recipeTags, setRecipeTags] = useState('')
  const [recipeFocus, setRecipeFocus] = useState('')
  const [recipeAvoid, setRecipeAvoid] = useState('')
  const [recipeLimit, setRecipeLimit] = useState(true)

  const handleSubmit = () => {
    const recipeRequest = {
      allIngredients: state.ingredientList,
      recipeTags: recipeTags,
      recipeFocus: recipeFocus,
      recipeAvoid: recipeAvoid,
      recipeLimit: recipeLimit
    }

    // Dispatch action to add ingredient
    dispatch({ type: "REQUEST_RECIPE", payload: recipeRequest });

    // Dispatch action to set temporary parameter input for recipe regeneration
    dispatch({ type: "SET_TEMP_PARAMETER_INPUT", payload: recipeRequest })
    // Clear input values
    setRecipeTags('');
    setRecipeFocus('');
    setRecipeAvoid('');
  }

  return(
    <Stack direction="column" width="0.43">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginBottom: 0.5 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          data-testid="recipe-generation"
        >
          &#8226; recipe generation
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: 1}}>
        <Stack direction="column">
          <Typography
            variant="h2"
            component="h2"
            sx={{ marginTop: 1.5, marginBottom: 0.5 }}
          >
            What should we cook tonight?
          </Typography>
          <TextField
            data-testid="recipeTags-input"
            color="primary"
            value={recipeTags}
            onChange={(e) => setRecipeTags(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit() }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{ marginTop: 3, marginBottom: 0.5 }}
          >
            Which ingredients should we use?
          </Typography>
          <TextField
            data-testid="recipeFocus-input"
            value={recipeFocus}
            onChange={(e) => setRecipeFocus(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit() }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{ marginTop: 3, marginBottom: 0.5 }}
          >
            Which ingredients should we avoid?
          </Typography>
          <TextField
            data-testid="recipeAvoid-input"
            value={recipeAvoid}
            onChange={(e) => setRecipeAvoid(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit() }}
          />
          <FormControlLabel
            label=<Typography variant="h2" component="h2" sx={{ marginTop: 1 }}>Only include pantry ingredients</Typography>
            control={<Checkbox data-testid="recipeLimit-input" checked={recipeLimit} onChange={(e) => setRecipeLimit(recipeLimit ? false : true)} />}
          />
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent='center'
        sx={{ marginTop: 5.6 }}
      >
        <Button
          data-testid="submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          generate
        </Button>
      </Box>
    </Stack>


  )
}

export default Parameters;