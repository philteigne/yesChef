import React, { useContext, useEffect, useRef } from 'react';

import IngredientListItem from './IngredientListItem';
import { applicationContext } from '../hooks/applicationContext';

import { Box } from '@mui/material';

const IngredientList = () => {

  const { state } = useContext(applicationContext);

  // AUTO SCROLL TO BOTTOM
  const ingredientsEndRef = useRef(null)

  const scrollToBottom = () => {
    ingredientsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom()
  }, [state.ingredientList]);

  return(
    <Box sx={{ display: 'flex', flexWrap:'wrap', height: '300px', overflow: "auto" }}>
        {state.ingredientList.map((ingredient) => {
          return(
            <React.Fragment>
              <IngredientListItem
                ingredient={ingredient}
                key={ingredient.id}
                sx={{ width: '100%' }}
              />
              <div ref={ingredientsEndRef} />
            </React.Fragment>
          )
        })}
    </Box>
  )
}

export default IngredientList;