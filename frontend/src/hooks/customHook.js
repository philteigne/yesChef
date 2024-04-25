import { useState, useCallback } from 'react';


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
    recipes: [],
    isLoading: false,
    error: null,
    activeRecipe: 1,
    recipeIngredients: []
  }
  

  const [ingredientListTest, setIngredientListTest] = useState(initialState.ingredientList);
  const [recipes, setRecipes] = useState(initialState.recipes);
  const [activeRecipe, setActiveRecipe] = useState(initialState.activeRecipe)
  const [recipeIngredients, setRecipeIngredients] = useState(initialState.recipeIngredients)
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [error, setError] = useState(initialState.error);
  
  const deleteIngredient = (ingredient) => {
    setIngredientListTest(
      ingredientListTest.filter((item) => item.id !== ingredient.id)
    )
  }
  
  const addIngredient = (ingredient) => {
    setIngredientListTest([...ingredientListTest, ingredient])
  }

  const fetchRecipes = useCallback((userId) => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/saved-recipes/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const fetchIngredients = useCallback((recipeId) => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/ingredients/recipe/${recipeId}`)
      .then(response => response.json())
      .then(data => {
        setRecipeIngredients(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);



  // calling useApplicationData function return these functions that changes states
  return {
    ingredientListTest,
    deleteIngredient,
    addIngredient,
    recipes,
    fetchRecipes,
    recipeIngredients,
    fetchIngredients,
    activeRecipe,
    setActiveRecipe,
    isLoading,
    error
  };
}

export default useApplicationData;