import { useReducer, useEffect } from 'react';

export const API_CALL_URL = "http://localhost:8080/api/"
const userId = 1

export const INITIAL_STATE = {
  ingredientList: [],
  deleteIngredientState: null,
  addIngredientState: null,
}

export const ACTIONS = {
  GET_INGREDIENTS_USER: "GET_INGREDIENTS_USER",
  DELETE_INGREDIENTS_USER: "DELETE_INGREDIENTS_USER",
  ADD_INGREDIENTS_USER: "ADD_INGREDIENTS_USER",
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
      fetch(`${API_CALL_URL}ingredients/${userId}`, {
        method: 'POST',
        body: ingredient
      })
      .then(() => dispatch({ type: ACTIONS.ADD_INGREDIENTS_USER, payload: null }))
    }
  }, [state.addIngredientState])


  // calling useApplicationData function return these functions that changes states
  return {
    state,
    dispatch,
  };
}

export default useApplicationData;