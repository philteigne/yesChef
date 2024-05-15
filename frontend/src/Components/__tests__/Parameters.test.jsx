import { render, fireEvent, screen } from "@testing-library/react";
import Parameters from "../Parameters";
import useApplicationData from "../../hooks/customHook";
import { applicationContext } from "../../hooks/applicationContext";

jest.mock('../../hooks/customHook')

describe('Parameters test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const ParametersTest = () => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{state,dispatch}} >
        <Parameters />
      </applicationContext.Provider>
    )
  }

  const mockIngredientList = [
    {
      "id": 1,
      "user_id": 1,
      "name": "Flour",
      "quantity": "500.00",
      "units": "grams"
    }
  ]

  it('should render without crashing', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: {
        ingredientList: mockIngredientList
      }, 
      dispatch: mockDispatch
    });
    render(<ParametersTest />)
  })

  it('inputs for recipe generation should be in Parameters Component', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: {
        ingredientList: mockIngredientList
      }, 
      dispatch: mockDispatch
    });
    render(<ParametersTest/>)
    
    const recipeTagsInput = screen.getByTestId('recipeTags-input')
    const recipeFocusInput = screen.getByTestId('recipeFocus-input')
    const recipeAvoidInput = screen.getByTestId('recipeLimit-input')
    const recipeLimitInput = screen.getByTestId('recipeLimit-input')
    
    expect(recipeTagsInput).toBeInTheDocument()
    expect(recipeFocusInput).toBeInTheDocument()
    expect(recipeAvoidInput).toBeInTheDocument()
    expect(recipeLimitInput).toBeInTheDocument()
  })

  it('after user input value into param, on submit, it should trigger 2 dispatch functions with user inputs as payload', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: {
        ingredientList: mockIngredientList
      }, 
      dispatch: mockDispatch
    });
    render(<ParametersTest/>)
    const recipeTagsInput = screen.getByTestId('recipeTags-input').querySelector('input')
    const recipeFocusInput = screen.getByTestId('recipeFocus-input').querySelector('input')
    const recipeAvoidInput = screen.getByTestId('recipeAvoid-input').querySelector('input')
    const recipeLimitInput = screen.getByTestId('recipeLimit-input')
    const submitBtn = screen.getByTestId('submit-btn')
    
    fireEvent.change(recipeTagsInput, {target: {value: 'chicken dinner'}})
    fireEvent.change(recipeFocusInput, {target: {value: 'chicken, mushroom'}})
    fireEvent.change(recipeAvoidInput, { target: { value: 'beef, fish' } })
    fireEvent.click(recipeLimitInput)
    
    expect(recipeTagsInput.value).toBe('chicken dinner')
    expect(recipeFocusInput.value).toBe('chicken, mushroom')
    expect(recipeAvoidInput.value).toBe('beef, fish')
    
    const recipeRequest = {
      allIngredients: mockIngredientList,
      recipeTags: recipeTagsInput.value,
      recipeFocus: recipeFocusInput.value,
      recipeAvoid: recipeAvoidInput.value,
      recipeLimit: false
    }

    fireEvent.click(submitBtn)

    expect(mockDispatch).toHaveBeenCalledWith({ type: "REQUEST_RECIPE", payload: recipeRequest })
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_TEMP_PARAMETER_INPUT", payload: recipeRequest })
  })
})