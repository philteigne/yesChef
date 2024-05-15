import { render, screen } from "@testing-library/react";
import RecipeList from "../RecipeList";
import { applicationContext } from "../../hooks/applicationContext";
import useApplicationData from "../../hooks/customHook";

jest.mock('../../hooks/customHook');

describe('RecipeList test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const RecipeListTest = () => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{ state, dispatch }}>
        <RecipeList />
      </applicationContext.Provider>
    );
  };

  const mockThemeColorsValue = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  };

  const mockRecipes = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      tags: "pasta",
      steps: "1. Boil pasta. 2. Prepare sauce. 3. Mix and serve."
    },
    {
      id: 2,
      title: "Chicken Curry",
      tags: "curry",
      steps: "1. Cook chicken. 2. Prepare curry sauce. 3. Mix and serve."
    }
  ];

  it('should render RecipeList without crashing', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        recipes: mockRecipes
      },
      dispatch: jest.fn()
    });
    render(<RecipeListTest />);
    expect(screen.getByTestId('recipe-list-container')).toBeInTheDocument();
  });

  it('should render the correct number of RecipeListItem components', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        recipes: mockRecipes
      },
      dispatch: jest.fn()
    });
    render(<RecipeListTest />);
    expect(screen.getAllByTestId("recipe-list-item").length).toBe(mockRecipes.length);
  });

  it('should display no RecipeListItem when there are no recipes', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        recipes: []
      },
      dispatch: jest.fn()
    });
    render(<RecipeListTest />);
    expect(screen.queryByTestId("recipe-list-item")).toBeNull();
  });
});
