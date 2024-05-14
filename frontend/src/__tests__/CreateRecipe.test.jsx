import { render, screen } from "@testing-library/react";
import CreateRecipe from "../Components/CreateRecipe";
import useApplicationData from "../hooks/customHook";
import { applicationContext } from "../hooks/applicationContext";

jest.mock('../hooks/customHook')

describe("CreateRecipe component test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function CreateRecipeTest () {
    const { state, dispatch } = useApplicationData();
  
    return(
          <applicationContext.Provider value={{state, dispatch}}>
            <CreateRecipe />
          </applicationContext.Provider>
    )
  }

  const mockThemeColorsValue = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  }

  const mockIngredientList = {
    "id": 21,
    "user_id": 3,
    "name": "Olive oil",
    "quantity": "1.50",
    "units": "tablespoons"
  }

  it('Create Recipe component renders without crashing', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          mockIngredientList
        ]
      },
      dispatch: jest.fn()
    });

    render(<CreateRecipeTest />)
    expect(screen.getByTestId('pantry-component')).toBeInTheDocument()
  });

  it('should be loading if loading state is true', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          mockIngredientList
        ],
        isLoading: true
      }, 
      dispatch: jest.fn()
    });
    render(<CreateRecipeTest />)
    expect(screen.getByTestId('Loading-animation')).toBeInTheDocument()
  })

  it('should only display RecipeResponseView component when state.recipeResponse is not null', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          mockIngredientList
        ],
        recipeResponse: {
          "title": "Classic Bread",
          "tags": ["baking"],
          "steps": [
            "1. Mix ingredients."
          ],
          "ingredients": [
            { "ingredient": "Flour", "quantity": 15.00, "units": "grams", "id": "1" }
          ]
        }
      }, 
      dispatch: jest.fn()
    });
    render(<CreateRecipeTest />)
    expect(screen.getByTestId('recipe-response-box')).toBeInTheDocument()
  })

  it('should display Parameter component when state.recipeResponse is null', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          mockIngredientList
        ],
        recipeResponse: null
      }, 
      dispatch: jest.fn()
    });
    render(<CreateRecipeTest/>)
    expect(screen.getByTestId('recipe-generation')).toBeInTheDocument()
  })
})
