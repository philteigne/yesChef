import { render, screen, fireEvent } from "@testing-library/react";
import RecipeResponseView from "../RecipeResponseView";
import { applicationContext } from "../../hooks/applicationContext";
import useApplicationData from "../../hooks/customHook";


jest.mock('../../hooks/customHook');

describe('RecipeResponseView test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const RecipeResponseViewTest = () => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{ state, dispatch }}>
        <RecipeResponseView />
      </applicationContext.Provider>
    );
  };

  const mockThemeColorsValue = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  };

  const mockRecipeResponse = {
    title: "Flank Steak Stir Fry",
    tags: ["stir fry"],
    steps: [
      "1. Slice the flank steak thinly against the grain.",
      "2. In a bowl, mix together olive oil, dark brown sugar, kosher salt, ground cumin, paprika, black pepper, and minced garlic cloves to create a marinade.",
      "3. Add the sliced flank steak to the marinade and let it sit for at least 30 minutes.",
      "4. Heat a wok or large skillet over high heat and add the marinated flank steak, stirring frequently until browned.",
      "5. Add sliced large onion, Yuengling Lager, lower-sodium soy sauce, and a bay leaf to the wok.",
      "6. Cook until the liquid reduces and the onions are tender-crisp.",
      "7. In a small bowl, mix cornstarch with a little water to create a slurry, then add it to the wok to thicken the sauce.",
      "8. Remove the bay leaf and serve the flank steak stir fry over hoagie rolls."
    ],
    ingredients: [
      { ingredient: "Olive oil", quantity: 1.5, units: "tablespoons" },
      { ingredient: "Dark brown sugar", quantity: 2, units: "tablespoons" },
      { ingredient: "Kosher salt", quantity: 0.75, units: "teaspoon" },
      { ingredient: "Ground cumin", quantity: 1, units: "teaspoon" },
      { ingredient: "Paprika", quantity: 1, units: "teaspoon" },
      { ingredient: "Black pepper", quantity: 1, units: "teaspoon" },
      { ingredient: "Garlic cloves", quantity: 3, units: "units" },
      { ingredient: "Flank steak", quantity: 2, units: "pounds" },
      { ingredient: "Large onion", quantity: 1, units: "units" },
      { ingredient: "Yuengling Lager", quantity: 12, units: "ounce" },
      { ingredient: "Lower-sodium soy sauce", quantity: 2, units: "tablespoons" },
      { ingredient: "Bay leaf", quantity: 1, units: "units" },
      { ingredient: "Cornstarch", quantity: 2, units: "teaspoons" },
      { ingredient: "Hoagie rolls", quantity: 8, units: "units" }
    ]
  };

  const mockStateWithRecipeResponse = {
    themeColors: mockThemeColorsValue,
    recipeResponse: mockRecipeResponse,
    saveRecipeLoading: false,
    isRecipeSaved: false,
    userId: 1,
    tempParameterInput: {
      recipeTags: ["stir fry"],
      recipeFocus: "Healthy",
      recipeAvoid: "Nuts",
      allIngredients: ["Olive oil", "Dark brown sugar", "Kosher salt"]
    }
  };


  it('should render RecipeResponseView without crashing', () => {
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipeResponse,
      dispatch: jest.fn()
    });
    render(<RecipeResponseViewTest />);
    expect(screen.getByTestId('recipe-response-box')).toBeInTheDocument();
  });

  it('should display the recipe details correctly', () => {
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipeResponse,
      dispatch: jest.fn()
    });
    render(<RecipeResponseViewTest />);
    expect(screen.getByText(/Flank Steak Stir Fry - stir fry/i)).toBeInTheDocument();
    expect(screen.getByText(/Olive oil - 1.5 tablespoons, Dark brown sugar - 2 tablespoons, Kosher salt - 0.75 teaspoon, Ground cumin - 1 teaspoon, Paprika - 1 teaspoon, Black pepper - 1 teaspoon, Garlic cloves - 3 units, Flank steak - 2 pounds, Large onion - 1 units, Yuengling Lager - 12 ounce, Lower-sodium soy sauce - 2 tablespoons, Bay leaf - 1 units, Cornstarch - 2 teaspoons, Hoagie rolls - 8 units/i)).toBeInTheDocument();
  });


  it('should trigger the save recipe dispatch function when save button is clicked', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipeResponse,
      dispatch: mockDispatch
    });

    render(<RecipeResponseViewTest />);

    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SAVE_RECIPE', payload: { userId: 1, recipe: mockRecipeResponse } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SAVE_RECIPE_LOADING', payload: true });
  });

  it('should trigger the clear recipe dispatch function when clear button is clicked', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipeResponse,
      dispatch: mockDispatch
    });

    render(<RecipeResponseViewTest />);

    const clearButton = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(clearButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_RECIPE_RESPONSE' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_TEMP_PARAMETER_INPUT', payload: null });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_IS_RECIPE_SAVED', payload: false });
  });

  it('should trigger the regenerate recipe dispatch function when regenerate button is clicked', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipeResponse,
      dispatch: mockDispatch
    });

    render(<RecipeResponseViewTest />);

    const regenerateButton = screen.getByRole('button', { name: /Regenerate/i });
    fireEvent.click(regenerateButton);

    const expectedPayload = {
      recipeTags: mockStateWithRecipeResponse.tempParameterInput.recipeTags,
      recipeFocus: mockStateWithRecipeResponse.tempParameterInput.recipeFocus,
      recipeAvoid: mockStateWithRecipeResponse.tempParameterInput.recipeAvoid,
      allIngredients: mockStateWithRecipeResponse.tempParameterInput.allIngredients,
      oldRecipeTitle: mockStateWithRecipeResponse.recipeResponse.title
    };

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'REQUEST_RECIPE', payload: expectedPayload });
  });
});
