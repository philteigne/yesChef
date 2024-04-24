import React, {useContext, useState} from 'react';
import { applicationContext } from '../hooks/applicationContext';

import { TextField, Button, FormGroup, Box, Stack } from '@mui/material';

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
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          justifyContent="space-between"
          direction="row"
          useFlexGap
        >
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            justifyContent="space-between"
            direction="row"
            useFlexGap
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
          <Button
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </FormGroup>
    </Box>
  )
}

export default AddIngredient;

