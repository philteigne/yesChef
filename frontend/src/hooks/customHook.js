import { useReducer, useEffect } from 'react';

export const API_CALL_URL = "http://localhost:8080/api/"
const userId = 1

export const INITIAL_STATE = {
  ingredientList: [],
}

export const ACTIONS = {
  GET_INGREDIENTS_USER: "GET_INGREDIENTS_USER" 
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.GET_INGREDIENTS_USER:
      return {
        ...state,
        ingredientList: action.payload
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // fetch ingredients from backend
  useEffect(() => {
    fetch(`${API_CALL_URL}ingredients/${userId}`)
    .then((res) => res.json())
    .then((data) => dispatch({ type: ACTIONS.GET_INGREDIENTS_USER, payload: data }))
  }, []);

  // delete an ingredient from backend 
  useEffect(() => {
    fetch(`${API_CALL_URL}ingredients/${userId}/`, {
      method: 'DELETE'
    })
  }, [])
  
  const deleteIngredient = (ingredient) => {
    // setIngredientListTest(
    //   ingredientListTest.filter((item) => item.id !== ingredient.id)
    // )
    return true
  }
  
  const addIngredient = (ingredient) => {
    // setIngredientListTest([...ingredientListTest, ingredient])
    return true
  }


  // calling useApplicationData function return these functions that changes states
  return {
    state,
    deleteIngredient,
    addIngredient
  };
}

export default useApplicationData;