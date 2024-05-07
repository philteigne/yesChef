import { useCallback, useReducer, useEffect } from 'react';

export const API_CALL_URL = "http://localhost:8080/api/"

// Basic App State
const INITIAL_STATE_APP = {
  userId: 1,
  // For handling save recipe button loading animation
  saveRecipeLoading: false,
  error: null,
}

// Pantry Component
const INITIAL_STATE_PANTRY = {
  ingredientList: [],
  deleteIngredientState: null,
  addIngredientState: null,
}

// Recipes Component
const INITIAL_STATE_RECIPES = {
  activeRecipe: 2,
  recipes: [],
  recipeIngredients: [],
  isLoading: false,
  deleteRecipeState: null,
}

// Parameters Component
const INITIAL_STATE_PARAMETERS = {
  recipeRequest: null,
  isRecipeSaved: false,
  // rerender saved recipes, get's trigger when recipe is saved to db
  shouldRerenderRecipes: [],
}

// MuI Theme
const INITIAL_STATE_THEME = {
  themeColors: {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  },
}

// AI Response
const INITIAL_STATE_AI = {
  recipeResponse: null,
  saveRecipeData: null,
  tempParameterInput: null,
}

// AI Chatbot
const INITIAL_STATE_CHATBOT = {
  chatModalOpen: false,
  chatQuery: null,
  chatResponse: null,
}

// ----- COMPLETE INITIAL STATE -----
export const INITIAL_STATE = {
  ...INITIAL_STATE_APP,
  ...INITIAL_STATE_PANTRY,
  ...INITIAL_STATE_RECIPES,
  ...INITIAL_STATE_PARAMETERS,
  ...INITIAL_STATE_THEME,
  ...INITIAL_STATE_AI,
  ...INITIAL_STATE_CHATBOT,
}


export const ACTIONS = {
  // INGREDIENT ACTIONS
  GET_INGREDIENTS_USER: "GET_INGREDIENTS_USER",
  DELETE_INGREDIENTS_USER: "DELETE_INGREDIENTS_USER",
  ADD_INGREDIENTS_USER: "ADD_INGREDIENTS_USER",

  // RECIPE ACTIONS
  SET_ACTIVE_RECIPE: "SET_ACTIVE_RECIPE",
  SET_RECIPES: "SET_RECIPES",
  SET_RECIPE_INGREDIENTS: "SET_RECIPE_INGREDIENTS",
  REQUEST_RECIPE: "REQUEST_RECIPE",
  SAVE_RECIPE: "SAVE_RECIPE",
  CLEAR_RECIPE_RESPONSE: "CLEAR_RECIPE_RESPONSE",
  RERENDER_RECIPES_TRIGGER: "RERENDER_RECIPES_TRIGGER",
  DELETE_RECIPE: "DELETE_RECIPE",

  // APP MANAGEMENT ACTIONS
  IS_LOADING: "IS_LOADING",
  SET_SAVE_RECIPE_LOADING: "SET_SAVE_RECIPE_LOADING",
  ERROR: "ERROR",
  DARK_MODE: "DARK_MODE",
  SET_IS_RECIPE_SAVED: "SET_IS_RECIPE_SAVED",
  SET_USER_ID: "SET_USER_ID",
  SAVE_RECIPE_SUCCESS: "SAVE_RECIPE_SUCCESS",
  SAVE_RECIPE_FAILURE: "SAVE_RECIPE_FAILURE",

  // AI ACTIONS
  SET_RECIPE_RESPONSE: "SET_RECIPE_RESPONSE",
  SET_TEMP_PARAMETER_INPUT: "SET_TEMP_PARAMETER_INPUT",

  // CHATBOT
  TOGGLE_CHAT: "TOGGLE_CHAT",
  REQUEST_AI_CHAT: "REQUEST_AI_CHAT",
  RECEIVE_AI_CHAT_RESPONSE: "RECEIVE_AI_CHAT_RESPONSE",
  SET_CHAT_QUERY: "SET_CHAT_QUERY"
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

    // ----- RECIPE MANAGEMENT -----
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
    case ACTIONS.SET_RECIPE_INGREDIENTS:
      return {
        ...state,
        recipeIngredients: action.payload
      }
    case ACTIONS.SAVE_RECIPE:
      return {
        ...state,
        saveRecipeData: action.payload,
        error: null,
      }
    case ACTIONS.RERENDER_RECIPES_TRIGGER:
      return {
        ...state,
        shouldRerenderRecipes: [...state.shouldRerenderRecipes, 1]
      }
    case ACTIONS.SET_IS_RECIPE_SAVED:
      return {
        ...state,
        isRecipeSaved: action.payload
      }
    case ACTIONS.DELETE_RECIPE:
      return {
        ...state,
        deleteRecipeState: action.payload
      }

    // ----- APP MANAGEMENT -----
    case ACTIONS.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ACTIONS.SAVE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case ACTIONS.SAVE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case ACTIONS.SET_USER_ID:
      return {
        ...state,
        userId: action.payload 
      }
    case ACTIONS.SET_SAVE_RECIPE_LOADING:
      return {
        ...state,
        saveRecipeLoading: action.payload
      }

    // ----- AI MANAGEMENT
    case ACTIONS.SET_RECIPE_RESPONSE:
      return {
        ...state,
        recipeResponse: action.payload
      }
    case ACTIONS.CLEAR_RECIPE_RESPONSE:
      return {
        ...state,
        recipeResponse: null
      }
    case ACTIONS.REQUEST_RECIPE:
      return {
        ...state,
        requestRecipe: action.payload
      }
    case ACTIONS.SET_TEMP_PARAMETER_INPUT:
      return {
        ...state,
        tempParameterInput: action.payload
      }
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // ----- CALLBACKS -----
  // fetch recipes from backend
  const fetchRecipes = useCallback((userId) => {
    dispatch({ type: ACTIONS.ERROR, payload: null })
    fetch(`/api/saved-recipes/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_RECIPES', payload: data })
      })
      .catch(err => {
        dispatch({ type: ACTIONS.ERROR, payload: err.message })
      });
  }, []);

  const fetchIngredients = useCallback((recipeId) => {
    dispatch({ type: ACTIONS.ERROR, payload: null })
    fetch(`/api/ingredients/recipe/${recipeId}`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ACTIONS.SET_RECIPE_INGREDIENTS, payload: data });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.ERROR, payload: err.message });
      });
  }, []);

  const saveRecipe = useCallback((recipeData) => {
    // Post to api route, backend saves new recipe to database
    fetch(`${API_CALL_URL}saved-recipes/recipe/${recipeData.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData.recipe)
    })
    // once data has been sent to database
    .then(() => {
      // check response status?
      // trigger render of saved-recipe
      dispatch({type: ACTIONS.RERENDER_RECIPES_TRIGGER})
      // after saving successfully, saveRecipeData should become null again
      dispatch({type: ACTIONS.SAVE_RECIPE, payload: null})
      // saving loading animation should become false
      setTimeout(() => {
        dispatch({type: ACTIONS.SET_SAVE_RECIPE_LOADING, payload: false})
        // set saved to true
        dispatch({type: ACTIONS.SET_IS_RECIPE_SAVED, payload: true})

      },1500)
    })
    .catch(error => {
      dispatch({ type: ACTIONS.SAVE_RECIPE_FAILURE, payload: error.message });
    })
  }, []);

  const deleteRecipe = useCallback(() => {
    const userId = state.userId;
    if (state.deleteRecipeState) {
      fetch(`http://localhost:8080/api/saved-recipes/${userId}/${state.deleteRecipeState}`, {
        method: 'DELETE'
      })
      .then(() => {dispatch({type: ACTIONS.DELETE_RECIPE, payload: null})
      })
    }
  }, [state.deleteRecipeState, state.userId]);

  // set userId
  const setUserId = (newUserId) => {
    dispatch({ type: ACTIONS.SET_USER_ID, payload: newUserId });
  };

  // ----- useEffects -----

  // INGREDIENTS 
  // fetch ingredients from backend
  useEffect(() => {
    fetch(`${API_CALL_URL}ingredients/${state.userId}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: ACTIONS.GET_INGREDIENTS_USER, payload: data }))
  }, [state.deleteIngredientState, state.addIngredientState, state.userId]);

  // delete an ingredient from backend 
  useEffect(() => {
    if (state.deleteIngredientState) {
      const ingredientId = state.deleteIngredientState;
      fetch(`${API_CALL_URL}ingredients/${state.userId}/${ingredientId}`, {
        method: 'DELETE'
      })
        .then(() => dispatch({ type: ACTIONS.DELETE_INGREDIENTS_USER, payload: null }))
    }
  }, [state.deleteIngredientState, state.userId])

  // add an ingredient to backend
  useEffect(() => {
    if (state.addIngredientState) {
      const ingredient = state.addIngredientState;
      console.log("ingredient", ingredient)
      fetch(`${API_CALL_URL}ingredients/${state.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
      })
        .then(() => dispatch({ type: ACTIONS.ADD_INGREDIENTS_USER, payload: null }))
    }
  }, [state.addIngredientState, state.userId])


  // RECIPES
  // request recipe with parameters chatgpt
  useEffect(() => {
    if (state.requestRecipe) {
      dispatch({ type: ACTIONS.IS_LOADING, payload: true });  
      fetch(`${API_CALL_URL}chat-gpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.requestRecipe)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        const aiRecipeObj = data;
        dispatch({ type: ACTIONS.SET_RECIPE_RESPONSE, payload: aiRecipeObj });
      })
      .catch(error => {
        dispatch({ type: ACTIONS.ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ACTIONS.IS_LOADING, payload: false });  
        dispatch({ type: ACTIONS.REQUEST_RECIPE, payload: null }); // reset request state
      });
    }
  }, [state.requestRecipe]);

  // when saveRecipeData change, that means user clicked save recipe button
  useEffect(() => {
    if (state.saveRecipeData) {
      saveRecipe(state.saveRecipeData) 
    }   
  }, [state.saveRecipeData, saveRecipe]);

  // fetch recipes from database, it runs when shouldRenderRecipe state changes and userId state changes
  useEffect(() => {
    fetchRecipes(state.userId);
  }, [fetchRecipes, state.userId, state.shouldRerenderRecipes, state.deleteRecipeState]);

  // fetch ingredients for specific recipe
  useEffect(() => {
    fetchIngredients(state.activeRecipe);
  }, [fetchIngredients, state.activeRecipe])

  // delete recipe from backend
  useEffect(() => {
    deleteRecipe(state.deleteRecipeState)
  }, [deleteRecipe, state.deleteRecipeState]);


  // APP MANAGEMENT
  // Set current userId
  useEffect(() => {
    setUserId(state.userId);
  }, [state.userId])

  // calling useApplicationData function return these functions that changes states
  return {
    state,
    dispatch
  };
}

export default useApplicationData;