import { useState } from 'react';


const useApplicationData = () => {

  const initialState = {
    ingredientList: [
      { id: 1, user_id: 1, name: 'Flour', quantity: 500.00, units: 'grams' },
      { id: 2, user_id: 1, name: 'Sugar', quantity: 200.00, units: 'grams' },
      { id: 3, user_id: 1, name: 'Salt', quantity: 5.00, units: 'grams' },
      { id: 4, user_id: 1, name: 'Yeast', quantity: 15.00, units: 'grams' },
      { id: 5, user_id: 1, name: 'Milk', quantity: 250.00, units: 'ml' },
      { id: 6, user_id: 1, name: 'Butter', quantity: 100.00, units: 'grams' },
      { id: 7, user_id: 1, name: 'Eggs', quantity: 3.00, units: 'units' },
      { id: 8, user_id: 1, name: 'Baking Powder', quantity: 10.00, units: 'grams' },
      { id: 9, user_id: 1, name: 'Cocoa Powder', quantity: 50.00, units: 'grams' },
      { id: 10, user_id: 1, name: 'Vanilla Extract', quantity: 5.00, units: 'ml' }
    ],
  }
  

  const [ingredientListTest, setIngredientListTest] = useState(initialState.ingredientList);
  
  const deleteIngredient = (ingredient) => {
    setIngredientListTest(
      ingredientListTest.filter((item) => item.id !== ingredient.id)
    )
  }
  
  const addIngredient = (ingredient) => {
    setIngredientListTest([...ingredientListTest, ingredient])
  }

  // calling useApplicationData function return these functions that changes states
  return {
    ingredientListTest,
    deleteIngredient,
    addIngredient
  };
}

export default useApplicationData;