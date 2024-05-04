-- Seed users with plain text passwords
INSERT INTO users (email, password_hash) VALUES ('john.doe@example.com', 'hashedpassword123');
INSERT INTO users (email, password_hash) VALUES ('jane.smith@example.com', 'hashedpassword456');


-- Seed recipes
INSERT INTO recipes (saved_by, title, tags, ingredients, steps) VALUES
(
  1,
  'Fluffy Vanilla Pancakes',
  'eggs breakfast',
  'Flour - 120 grams, Sugar - 10 grams, Milk - 250 ml, Vanilla Extract - 5 ml, Eggs - 1 unit, Butter - 5 ml',
  '1. In a mixing bowl, whisk together 1 cup of flour, 1 tablespoon of sugar, and a pinch of salt.
  2. In a separate bowl, beat 1 egg and mix in 1 cup of milk and 1 teaspoon of vanilla extract.
  3. Pour the wet ingredients into the dry ingredients and stir until just combined. Do not overmix; lumps are okay.
  4. Heat a non-stick pan or griddle over medium heat and lightly grease with butter.
  5. Pour 1/4 cup of the pancake batter onto the pan for each pancake.
  6. Cook until bubbles form on the surface, then flip and cook for another minute or until golden brown.
  7. Repeat with the remaining batter.
  8. Serve the fluffy vanilla pancakes warm with maple syrup or your favorite toppings.'
);
INSERT INTO recipes (saved_by, title, tags, ingredients, steps) VALUES
(
  1,
  'Vanilla Milk Pudding',
  'dessert',
  'Sugar - 200 grams, Milk - 250 ml, Vanilla Extract - 5 ml, Mustard - 5 ml, Ketchup - 5 ml, Turmeric - 5 ml, Garam Masala - 5 ml',
  '1. In a saucepan, combine 200g of sugar, 250ml of milk, and 5ml of vanilla extract.
  2. Heat the mixture over medium heat, stirring constantly until the sugar is completely dissolved.
  3. In a separate bowl, mix 5ml of mustard and 5ml of ketchup.
  4. Gradually pour the milk mixture into the mustard and ketchup mixture, stirring continuously.
  5. Add 5ml of turmeric and stir well.
  6. Pour the mixture into individual serving cups and refrigerate for at least 2 hours to set.
  7. Serve the vanilla milk pudding chilled, garnished with a sprinkle of garam masala.'
);

INSERT INTO recipes (saved_by, title, tags, ingredients, steps) VALUES
(
  2,
  'Spicy Chicken Tacos',
  'dinner spicy chicken tacos',
  'Chicken Breast - 500 grams, Taco Seasoning - 30 grams, Olive Oil - 30 ml, Lime Juice - 15 ml, Garlic - 2 cloves, Chili Powder - 10 grams, Cumin - 5 grams, Salt - 5 grams, Tortillas - 8 units, Avocado - 1 unit, Tomato - 1 unit, Onion - 1 unit, Cilantro - 1 bunch, Sour Cream - 100 grams',
  '1. In a bowl, mix 500g of diced chicken breast with 30g of taco seasoning, 30ml of olive oil, and 15ml of lime juice.
  2. Add minced garlic, chili powder, cumin, and salt. Mix well and marinate for 30 minutes.
  3. Heat a skillet over medium-high heat and cook the chicken until browned and cooked through.
  4. Warm the tortillas in the skillet.
  5. Assemble the tacos with the cooked chicken, sliced avocado, diced tomato, chopped onion, and cilantro.
  6. Serve the spicy chicken tacos with a dollop of sour cream on top.'
);
INSERT INTO recipes (saved_by, title, tags, ingredients, steps) VALUES
(
  2,
  'Classic Margherita Pizza',
  'dinner pizza margherita',
  'Pizza Dough - 1 ball, Tomato Sauce - 200 ml, Fresh Mozzarella - 200 grams, Fresh Basil - 1 bunch, Olive Oil - 30 ml, Salt - 5 grams',
  '1. Preheat your oven to 475°F (245°C).
  2. Roll out the pizza dough on a floured surface to your desired thickness.
  3. Spread 200ml of tomato sauce evenly over the dough, leaving a small border around the edges.
  4. Tear the fresh mozzarella into small pieces and distribute them over the sauce.
  5. Tear the fresh basil leaves and scatter them over the pizza.
  6. Drizzle the pizza with 30ml of olive oil and sprinkle with salt.
  7. Transfer the pizza to a baking sheet or pizza stone and bake for 10-12 minutes, or until the crust is golden brown and the cheese is bubbly.
  8. Remove from the oven, slice, and serve the classic Margherita pizza hot.'
);

-- Seed ingredients
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Flour', 500.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Sugar', 200.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Salt', 5.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Yeast', 15.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Milk', 250.00, 'ml');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Butter', 100.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Eggs', 3.00, 'units');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Baking Powder', 10.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Cocoa Powder', 50.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (1, 'Vanilla Extract', 5.00, 'ml');

INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Olive Oil', 100.00, 'ml');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Garlic', 30.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Onions', 0.50, 'units');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Tomatoes', 200.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Basil', 20.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Parsley', 20.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Black Pepper', 5.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Cheese', 150.00, 'grams');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Chicken Breast', 2.00, 'units');
INSERT INTO ingredients (user_id, name, quantity, units) VALUES (2, 'Lemons', 2.00, 'units');