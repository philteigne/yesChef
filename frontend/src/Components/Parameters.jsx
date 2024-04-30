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
      width="0.5"
    >
      <Box sx={{ overflow: 'hidden' }}>  
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row'}}>
          <Typography variant="h1" component="h1" color="primary">&#8226; recipe generation</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, maxWidth: 1}}>
          <Stack
            direction="column"
            spacing={1}
          >
            <Typography
              variant="h2"
              component="h2"
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
            >
              Which ingredients should we avoid?
            </Typography>
            <TextField
              variant="outlined"
              value={recipeAvoid}
              onChange={(e) => setRecipeAvoid(e.target.value)}
            />
          </Stack>
        </Box>
      </Box>
      <Box display="flex" justifyContent='center'>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          sx={{width: 0.5}}
        >
          submit
        </Button>
      </Box>
    </Stack>


  )
}

export default Parameters;