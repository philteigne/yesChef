import React, {useContext, useState} from 'react';

import { TextField, Button, Box, Stack } from '@mui/material';

import { applicationContext } from '../hooks/applicationContext';

const AddIngredient = () => {

  const { dispatch } = useContext(applicationContext)

  const [ingredientName, setIngredientName] = useState('')

  const handleSubmit = () => {
    const inputIngredient = {
      name: ingredientName,
      user_id: 1,
    }

    // Dispatch action to add ingredient
    dispatch({ type: "ADD_INGREDIENTS_USER", payload: inputIngredient });

    // Clear input values
    setIngredientName('');
  };

  return (
    <Stack>
      <Box sx={{ flexGrow: 1, maxWidth: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <TextField
            label="Ingredient Name"
            value={ingredientName}
            fullWidth
            onChange={(e) => setIngredientName(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit() }}
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
          add ingredient
        </Button>
      </Box>
    </Stack>
  )
}

export default AddIngredient;

