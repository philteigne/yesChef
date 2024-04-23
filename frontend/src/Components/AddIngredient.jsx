import React from 'react';

import { TextField, Button, FormGroup, Box, Stack } from '@mui/material';

const AddIngredient = ({ingredientListTest, addIngredient}) => {
  const inputIngredient = {user_id: 1, quantity: 5.00, units: 'ml'};
  inputIngredient.id = ingredientListTest[ingredientListTest.length - 1].id + 1;

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
              onChange={(e) => inputIngredient.name=(e.target.value)}
            />
            <TextField variant="outlined" label="Category" />
            <TextField variant="outlined" label="Best Before" />
          </Stack>
          <Button type ="submit" onClick={() => addIngredient(inputIngredient)}>Submit</Button>
        </Stack>
      </FormGroup>
    </Box>
  )
}

export default AddIngredient;

