import { render, screen, queryAllByText } from "@testing-library/react";
import IngredientList from "../IngredientList";
import { applicationContext } from "../../hooks/applicationContext";
import useApplicationData from "../../hooks/customHook";

jest.mock('../../hooks/customHook')

describe('IngredientList test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  const IngredientListTest = () => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{state, dispatch}} >
        <IngredientList />
      </applicationContext.Provider>
    )
  }

  const mockThemeColorsValue = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  }

  const mockIngredientList = [
    {
      "id": 21,
      "user_id": 3,
      "name": "Olive oil",
      "quantity": "1.50",
      "units": "tablespoons"
    },
    {
      "id": 22,
      "user_id": 3,
      "name": "Avocado",
      "quantity": "1",
      "units": "units"
    }
  ]

  it('should render IngredientList without crashing', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          ...mockIngredientList
        ]
      }, 
      dispatch: jest.fn()
    });
    render(<IngredientListTest />);
    expect(screen.getByTestId('ingredient-list-container')).toBeInTheDocument()
  })

  it('should render ingredients-items base state', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          ...mockIngredientList
        ]
      }, 
      dispatch: jest.fn()
    });
    render(<IngredientListTest />)
    const oliveOilElements = screen.queryAllByText('Olive oil');
    const avocadoElements = screen.queryAllByText('Avocado');

    //At least one instance of each text is present
    expect(oliveOilElements.length).toBeGreaterThan(0);
    expect(avocadoElements.length).toBeGreaterThan(0);
    
  })
})