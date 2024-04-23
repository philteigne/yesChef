import React from 'react';

import '../styles/AddIngredient.scss';

import { TextField, Button, FormGroup, Box, Stack } from '@mui/material';

const AddIngredient = () => {

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
            <TextField variant="outlined" label="Ingredient" />
            <TextField variant="outlined" label="Category" />
            <TextField variant="outlined" label="Best Before" />
          </Stack>
          <Button type ="submit">Submit</Button>
        </Stack>
      </FormGroup>
    </Box>
  )
}

export default AddIngredient;

