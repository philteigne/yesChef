import React from "react";
import IngredientListItem from "./IngredientListItem";
import '../styles/IngredientList.scss';

import { List, Box } from '@mui/material'

const IngredientList = ({ingredientListTest, deleteIngredient}) => {
  return(
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <List>
        {ingredientListTest.map((ingredient) => {
          return(
            <IngredientListItem
              ingredient={ingredient}
              key={ingredient.id}
              deleteIngredient={deleteIngredient}
            />
          )
        })}
      </List>
    </Box>
  )
}

export default IngredientList;