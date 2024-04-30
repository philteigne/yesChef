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

    // Clear input values
    setRecipeTags('');
    setRecipeFocus('');
    setRecipeAvoid('');
  }

  return(
    <Stack
      direction="column"
      width="0.43"
    >
      <Box>  
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row', marginBottom: 0.5 }}>
          <Typography variant="h1" component="h1" color="primary">&#8226; recipe generation</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, maxWidth: 1}}>
          <Stack
            direction="column"
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ marginTop: 1.5, marginBottom: 0.5 }}
            >
              What should we cook tonight?
            </Typography>
            <TextField
              variant="outlined"
              color="primary"
              value={recipeTags}
              onChange={(e) => setRecipeTags(e.target.value)}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{ marginTop: 3, marginBottom: 0.5 }}
            >
              Which ingredients should we use?
            </Typography>
            <TextField
              variant="outlined"
              value={recipeFocus}
              onChange={(e) => setRecipeFocus(e.target.value)}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{ marginTop: 3, marginBottom: 0.5 }}
            >
              Which ingredients should we avoid?
            </Typography>
            <TextField
              variant="outlined"
              value={recipeAvoid}
              onChange={(e) => setRecipeAvoid(e.target.value)}
            />
            <FormControlLabel
              sx={{ marginTop: 3, alignItems: 'center' }}
              label=<Typography variant="h2" component="h2" sx={{ marginTop: 1 }}>Only include pantry ingredients</Typography>
              control={<Checkbox checked={recipeLimit} onChange={(e) => setRecipeLimit(recipeLimit ? false : true)} />}
            />
          </Stack>
        </Box>
      </Box>
      <Box display="flex" justifyContent='center'>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: 0.5, marginTop: 5.6 }}
        >
          submit
        </Button>
      </Box>
    </Stack>


  )
}

export default Parameters;