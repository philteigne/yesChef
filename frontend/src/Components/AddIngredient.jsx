import React, {useContext, useState} from 'react';
import { applicationContext } from '../hooks/applicationContext';

import { TextField, Button, Box, Stack } from '@mui/material';

const AddIngredient = () => {

  const { dispatch } = useContext(applicationContext)

  const [ingredientName, setIngredientName] = useState('')
  const [ingredientCategory, setIngredientCategory] = useState('')
  const [ingredientExpiry, setIngredientExpiry] = useState('')

  const handleSubmit = () => {
    const inputIngredient = {
      name: ingredientName,
      user_id: 1,
      quantity: 5.00,
      units: 'ml'
    }

    // Dispatch action to add ingredient
    dispatch({ type: "ADD_INGREDIENTS_USER", payload: inputIngredient });

    // Clear input values
    setIngredientName('');
    setIngredientCategory('');
    setIngredientExpiry('');
  };

  return (
    <Stack>
      <Box sx={{ flexGrow: 1, maxWidth: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={1}
          >
            <TextField
              variant="outlined"
              label="Ingredient"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Category"
              value={ingredientCategory}
              onChange={(e) => setIngredientCategory(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Best Before"
              value={ingredientExpiry}
              onChange={(e) => setIngredientExpiry(e.target.value)}
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        display='flex'
        justifyContent='flex-end'
      >
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

export default AddIngredient;

