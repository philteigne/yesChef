import { render, screen, fireEvent } from "@testing-library/react";
import RecipeListItem from "../RecipeListItem";
import { applicationContext } from "../../hooks/applicationContext";
import useApplicationData from "../../hooks/customHook";

jest.mock('../../hooks/customHook');

describe('RecipeListItem test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const RecipeListItemTest = ({ recipe }) => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{state, dispatch}} >
        <RecipeListItem recipe={recipe} />
      </applicationContext.Provider>
    );
  }

  const mockThemeColorsValue = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  }

  const mockRecipe = {
    id: 1,
    saved_by: 1,
    title: "Spaghetti Bolognese",
    tags: "spaghetti, pasta",
    steps: "some steps text"
  }

  it('should render RecipeListItem without crashing', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        recipeList: [mockRecipe]
      },
      dispatch: jest.fn()
    });
    render(<RecipeListItemTest recipe={mockRecipe} />);
    expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
  });

  it('should trigger the delete recipe dispatch function when delete button is clicked', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        recipeList: [mockRecipe]
      },
      dispatch: mockDispatch
    });

    render(<RecipeListItemTest recipe={mockRecipe} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DELETE_RECIPE', payload: mockRecipe.id });
  });

  it('should trigger the set active recipe dispatch function when list item is clicked', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        recipeList: [mockRecipe]
      },
      dispatch: mockDispatch
    });

    render(<RecipeListItemTest recipe={mockRecipe} />);

    const listItem = screen.getByText('Spaghetti Bolognese');
    fireEvent.click(listItem);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_ACTIVE_RECIPE', payload: mockRecipe.id });
  });
});
