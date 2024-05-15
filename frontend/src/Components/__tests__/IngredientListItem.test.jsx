import { render, screen, fireEvent, within } from "@testing-library/react";
import IngredientListItem from "../IngredientListItem";
import { applicationContext } from "../../hooks/applicationContext";
import useApplicationData from "../../hooks/customHook";

jest.mock('../../hooks/customHook')
describe('IngredientList test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  const IngredientListItemTest = () => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{state, dispatch}} >
        <IngredientListItem ingredient={mockIngredientList[0]}/>
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
    }
  ]

  it('should render IngredientListItem without crashing', () => {
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          ...mockIngredientList
        ]
      }, 
      dispatch: jest.fn()
    });
    render(<IngredientListItemTest />);
    expect(screen.getByTestId('ingredientListItem-container')).toBeInTheDocument()
  })

  it('When user click delete button it trigger the delete ingredient dispatch function', () => {
    const mockDispatch = jest.fn();
    useApplicationData.mockReturnValue({
      state: {
        themeColors: mockThemeColorsValue,
        ingredientList: [
          ...mockIngredientList
        ]
      }, 
      dispatch: mockDispatch
    });

    render(<IngredientListItemTest />)
    const ingredientListItemContainer = screen.getByTestId('ingredientListItem-container');

    const oliveOilListItem = within(ingredientListItemContainer).getByText('Olive oil');
    expect(oliveOilListItem).toBeInTheDocument();

    const deleteButton = within(ingredientListItemContainer).getByTestId('delete-ingredient-btn');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DELETE_INGREDIENTS_USER', payload: mockIngredientList[0].id });
  })

})