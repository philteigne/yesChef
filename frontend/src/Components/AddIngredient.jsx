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
          <TextField
            label="Ingredient"
            value={ingredientName}
            sx={{ width: 0.32 }}
            onChange={(e) => setIngredientName(e.target.value)}
          />
          <TextField
            label="Category"
            value={ingredientCategory}
            sx={{ width: 0.32 }}
            onChange={(e) => setIngredientCategory(e.target.value)}
          />
          <TextField
            label="Best Before"
            value={ingredientExpiry}
            sx={{ width: 0.32 }}
            onChange={(e) => setIngredientExpiry(e.target.value)}
          />
        </Stack>
      </Box>
      <Box
        display='flex'
        justifyContent='flex-end'
        sx={{ marginTop: 2 }}
      >
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          submit
        </Button>
      </Box>
    </Stack>
  )
}

export default AddIngredient;

