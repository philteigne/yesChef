import { useState, useCallback, useReducer, useEffect } from 'react';

export const API_CALL_URL = "http://localhost:8080/api/"
const userId = 1

export const INITIAL_STATE = {
  userId: 1,
  // Pantry components
  ingredientList: [],
  deleteIngredientState: null,
  addIngredientState: null,
  // Recipes Components
  activeRecipe: 2,
  recipes: []
}

  const initialState = {
    recipes: [],
    isLoading: false,
    error: null,
    recipeIngredients: [],
  }
  
export const ACTIONS = {
  GET_INGREDIENTS_USER: "GET_INGREDIENTS_USER",
  DELETE_INGREDIENTS_USER: "DELETE_INGREDIENTS_USER",
  ADD_INGREDIENTS_USER: "ADD_INGREDIENTS_USER",
  SET_ACTIVE_RECIPE: "SET_ACTIVE_RECIPE",
  SET_RECIPES: "SET_RECIPES"
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.GET_INGREDIENTS_USER:
      return {
        ...state,
        ingredientList: action.payload,
      }
    case ACTIONS.DELETE_INGREDIENTS_USER:
      return {
        ...state,
        deleteIngredientState: action.payload,
      }
    case ACTIONS.ADD_INGREDIENTS_USER:
      return {
        ...state,
        addIngredientState: action.payload,
      }

    // Actions to handle recipes
    case ACTIONS.SET_ACTIVE_RECIPE:
      return {
        ...state,
        activeRecipe: action.payload
      }

    case ACTIONS.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {

  // const [recipes, setRecipes] = useState(initialState.recipes);
  const [recipeIngredients, setRecipeIngredients] = useState(initialState.recipeIngredients)
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [error, setError] = useState(initialState.error);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // fetch ingredients from backend
  useEffect(() => {
    fetch(`${API_CALL_URL}ingredients/${userId}`)
    .then((res) => res.json())
    .then((data) => dispatch({ type: ACTIONS.GET_INGREDIENTS_USER, payload: data }))
  }, [state.deleteIngredientState, state.addIngredientState]);

  // delete an ingredient from backend 
  useEffect(() => {
    if (state.deleteIngredientState) {
      const ingredientId = state.deleteIngredientState;
      fetch(`${API_CALL_URL}ingredients/${userId}/${ingredientId}`, {
        method: 'DELETE'
      })
      .then(() => dispatch({ type: ACTIONS.DELETE_INGREDIENTS_USER, payload: null }))
    }
  }, [state.deleteIngredientState])
  
  // add an ingredient to backend
  useEffect(() => {
    if (state.addIngredientState){
      const ingredient = state.addIngredientState;
      console.log("ingredient", ingredient)
      fetch(`${API_CALL_URL}ingredients/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
      })
      .then(() => dispatch({ type: ACTIONS.ADD_INGREDIENTS_USER, payload: null }))
    }
  }, [state.addIngredientState])

  const fetchRecipes = useCallback((userId) => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/saved-recipes/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'SET_RECIPES', payload: data})
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

    // fetch current view recipe from backend
    useEffect(() => {
      fetchRecipes(state.userId);
    }, [fetchRecipes, state.userId]);
    
    useEffect(() => {
      console.log("Active recipe updated to:", state.activeRecipe);
      fetchIngredients(state.activeRecipe);
    }, [fetchIngredients, state.activeRecipe])

  // calling useApplicationData function return these functions that changes states
  return {
    recipeIngredients,
    isLoading,
    fetchRecipes,
    error,
    state,
    dispatch,
  };
}

export default useApplicationData;