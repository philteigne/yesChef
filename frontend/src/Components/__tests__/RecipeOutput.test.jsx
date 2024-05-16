import { render, screen } from "@testing-library/react";
import RecipeOutput from "../RecipeOutput";

describe('RecipeOutput component', () => {
  const mockRecipe = {
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
      { name: "Olive oil", quantity: 1.5, units: "tablespoons" },
      { name: "Dark brown sugar", quantity: 2, units: "tablespoons" },
      { name: "Kosher salt", quantity: 0.75, units: "teaspoon" },
      { name: "Ground cumin", quantity: 1, units: "teaspoon" },
      { name: "Paprika", quantity: 1, units: "teaspoon" },
      { name: "Black pepper", quantity: 1, units: "teaspoon" },
      { name: "Garlic cloves", quantity: 3, units: "units" },
      { name: "Flank steak", quantity: 2, units: "pounds" },
      { name: "Large onion", quantity: 1, units: "units" },
      { name: "Yuengling Lager", quantity: 12, units: "ounce" },
      { name: "Lower-sodium soy sauce", quantity: 2, units: "tablespoons" },
      { name: "Bay leaf", quantity: 1, units: "units" },
      { name: "Cornstarch", quantity: 2, units: "teaspoons" },
      { name: "Hoagie rolls", quantity: 8, units: "units" }
    ]
  };

  it('should render RecipeOutput without crashing', () => {
    render(<RecipeOutput recipe={mockRecipe} />);
    expect(screen.getByTestId("recipe-title")).toBeInTheDocument();
    expect(screen.getByTestId("recipe-tags")).toBeInTheDocument();
  });

  it('should display the recipe title and tags', () => {
    render(<RecipeOutput recipe={mockRecipe} />);
    expect(screen.getByText(mockRecipe.title)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.tags.join(', '))).toBeInTheDocument();
  });

  it('should display all ingredients', () => {
    render(<RecipeOutput recipe={mockRecipe} />);
    mockRecipe.ingredients.forEach(ingredient => {
      const ingredientText = `${ingredient.name} - ${ingredient.quantity} ${ingredient.units}`;
      const ingredientElements = screen.getAllByText((content, element) => {
        return element.textContent.includes(ingredient.name);
      });
      const matchingElement = ingredientElements.find(element => 
        element.textContent.includes(ingredientText)
      );
      expect(matchingElement).toHaveTextContent(ingredientText);
    });
  });

  it('should display all steps', () => {
    render(<RecipeOutput recipe={mockRecipe} />);
    mockRecipe.steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});
