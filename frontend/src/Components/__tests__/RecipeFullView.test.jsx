import { render, screen, fireEvent } from "@testing-library/react";
import RecipeFullView from "../RecipeFullView";
import { applicationContext } from "../../hooks/applicationContext";
import useApplicationData from "../../hooks/customHook";

jest.mock('../../hooks/customHook');

describe('RecipeFullView test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const RecipeFullViewTest = () => {
    const { state, dispatch } = useApplicationData();

    return (
      <applicationContext.Provider value={{state, dispatch}} >
        <RecipeFullView />
      </applicationContext.Provider>
    );
  }

  const mockThemeColorsValue = {
    bgColor: '#EAE7DC',
    textColor: '#4A4A45',
    accentColor: '#E85A4F'
  }

  const mockStateWithRecipe = {
    themeColors: mockThemeColorsValue,
    activeRecipe: 6,
    recipes: [
      {
        id: 5,
        saved_by: 3,
        title: "Slow-Cooker Flank Steak Au Jus Sandwiches",
        tags: "slow cooker, beef",
        steps: "1. Combine spices, sugar, and oil to create a marinade. 2. Rub marinade on steak and place in slow cooker.\n3. Add onions, garlic, bay leaf, and Yuengling Lager. 4. Cook on low for 8 hours. 5. Remove steak and shred.\n6. Mix cornstarch with water and add to slow cooker to thicken sauce. 7. Serve on hoagie rolls."
      },
      {
        id: 6,
        saved_by: 3,
        title: "Beer-Marinated Steak Stir Fry",
        tags: "stir fry",
        steps: "1. In a bowl, mix together Yuengling Lager, lower-sodium soy sauce, dark brown sugar, kosher salt, ground cumin, paprika, black pepper, and minced garlic cloves to create the marinade. 2. Place the flank steak in a resealable bag or container and pour the marinade over it. Ensure the steak is well coated. Marinate in the refrigerator for at least 2 hours, preferably overnight. 3. Heat olive oil in a large skillet or wok over high heat. Add sliced onion and cook until slightly caramelized. 4. Remove the steak from the marinade (reserve the marinade) and cut it into thin strips. 5. Add the steak strips to the skillet and stir-fry until browned on the outside but still slightly pink inside. 6. Pour in the reserved marinade, add a bay leaf, and cook for a few minutes until the sauce thickens slightly. 7. In a small bowl, mix cornstarch with a little water to create a slurry. Stir the slurry into the skillet to further thicken the sauce. 8. Serve the beer-marinated steak stir fry hot over cooked rice or on toasted hoagie rolls."
      }
    ],
    recipeIngredients: [
      {
        name: "Flour",
        quantity: "250.00",
        units: "grams"
      },
      {
        name: "Sugar",
        quantity: "200.00",
        units: "grams"
      },
      {
        name: "Butter",
        quantity: "100.00",
        units: "grams"
      },
      {
        name: "Eggs",
        quantity: "3.00",
        units: "units"
      },
      {
        name: "Cocoa Powder",
        quantity: "50.00",
        units: "grams"
      }
    ]
  };

  const mockStateWithoutRecipe = {
    themeColors: mockThemeColorsValue,
    activeRecipe: null,
    recipes: [],
    recipeIngredients: []
  };

  it('should render RecipeFullView without crashing', () => {
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipe,
      dispatch: jest.fn()
    });
    render(<RecipeFullViewTest />);
    expect(screen.getByText(/recipe viewer/i)).toBeInTheDocument();
  });

  it('should display message when no recipe is selected', () => {
    useApplicationData.mockReturnValue({
      state: mockStateWithoutRecipe,
      dispatch: jest.fn()
    });
    render(<RecipeFullViewTest />);
    expect(screen.getByText(/Please select or create a recipe!/i)).toBeInTheDocument();
  });

  it('should display the selected recipe details when a recipe is selected', () => {
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipe,
      dispatch: jest.fn()
    });
    render(<RecipeFullViewTest />);
    expect(screen.getByText(/Beer-Marinated Steak Stir Fry - stir fry/i)).toBeInTheDocument();
    expect(screen.getByText(/Flour - 250.00 grams , Sugar - 200.00 grams , Butter - 100.00 grams , Eggs - 3.00 units , Cocoa Powder - 50.00 grams/i)).toBeInTheDocument();
  });

  
  it('should display the recipe steps correctly', () => {
    useApplicationData.mockReturnValue({
      state: mockStateWithRecipe,
      dispatch: jest.fn()
    });
    render(<RecipeFullViewTest />);
    const steps = [
      "1. In a bowl, mix together Yuengling Lager, lower-sodium soy sauce, dark brown sugar, kosher salt, ground cumin, paprika, black pepper, and minced garlic cloves to create the marinade.",
      "2. Place the flank steak in a resealable bag or container and pour the marinade over it. Ensure the steak is well coated. Marinate in the refrigerator for at least 2 hours, preferably overnight.",
      "3. Heat olive oil in a large skillet or wok over high heat. Add sliced onion and cook until slightly caramelized.",
      "4. Remove the steak from the marinade (reserve the marinade) and cut it into thin strips.",
      "5. Add the steak strips to the skillet and stir-fry until browned on the outside but still slightly pink inside.",
      "6. Pour in the reserved marinade, add a bay leaf, and cook for a few minutes until the sauce thickens slightly.",
      "7. In a small bowl, mix cornstarch with a little water to create a slurry. Stir the slurry into the skillet to further thicken the sauce.",
      "8. Serve the beer-marinated steak stir fry hot over cooked rice or on toasted hoagie rolls."
    ];
    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});
