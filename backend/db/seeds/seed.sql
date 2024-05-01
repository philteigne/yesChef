-- Seed users with plain text passwords
INSERT INTO users (email, password_hash) VALUES ('john.doe@example.com', 'hashedpassword123');
INSERT INTO users (email, password_hash) VALUES ('jane.smith@example.com', 'hashedpassword456');


-- Seed recipes
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Classic Bread', 'baking, bread', '1. Mix ingredients. 2. Knead dough. 3. Let rise. 4. Bake at 200°C for 30 minutes.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Chocolate Cake', 'baking, dessert', '1. Mix dry ingredients. 2. Add wet ingredients. 3. Mix well. 4. Bake at 175°C for 45 minutes.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Spaghetti Bolognese', 'pasta, Italian', '1. Boil water. 2. Cook spaghetti. 3. Brown ground beef. 4. Add tomato sauce. 5. Simmer sauce. 6. Serve over spaghetti.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Chicken Stir-Fry', 'chicken, stir-fry', '1. Marinate chicken. 2. Chop vegetables. 3. Stir-fry chicken. 4. Add vegetables. 5. Season with soy sauce and spices. 6. Serve hot.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Vegetable Curry', 'vegetarian, curry', '1. Sauté onions and garlic. 2. Add curry paste. 3. Stir in coconut milk. 4. Add vegetables. 5. Simmer until tender. 6. Serve with rice.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Grilled Salmon', 'seafood, grill', '1. Marinate salmon fillets. 2. Preheat grill. 3. Grill salmon for 5-7 minutes on each side. 4. Serve with lemon wedges.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Caesar Salad', 'salad, healthy', '1. Chop lettuce. 2. Prepare dressing. 3. Toss lettuce with dressing. 4. Add croutons and Parmesan cheese. 5. Serve chilled.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Tofu Stir-Fry', 'vegetarian, stir-fry', '1. Press tofu. 2. Cut tofu into cubes. 3. Stir-fry tofu until golden. 4. Add vegetables. 5. Season with soy sauce and ginger. 6. Serve over rice.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Beef Tacos', 'Mexican, beef', '1. Brown ground beef. 2. Add taco seasoning. 3. Warm tortillas. 4. Assemble tacos with beef and toppings. 5. Serve with salsa and guacamole.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Vegetarian Chili', 'vegetarian, chili', '1. Sauté onions and peppers. 2. Add beans, tomatoes, and spices. 3. Simmer for 30 minutes. 4. Serve hot with toppings like cheese and sour cream.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Shrimp Scampi', 'seafood, pasta', '1. Cook pasta. 2. Sauté shrimp in butter and garlic. 3. Add white wine and lemon juice. 4. Toss with cooked pasta. 5. Garnish with parsley.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Mushroom Risotto', 'vegetarian, Italian', '1. Sauté mushrooms and onions. 2. Add Arborio rice. 3. Stir in vegetable broth gradually. 4. Simmer until creamy. 5. Garnish with Parmesan cheese.');

INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(2, 'Garlic Pasta', 'italian, dinner', '1. Cook pasta. 2. Saute garlic in olive oil. 3. Toss pasta with garlic oil and cheese. 4. Serve warm.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(2, 'Grilled Chicken', 'dinner, healthy', '1. Marinate chicken in lemon juice and herbs. 2. Grill until cooked. 3. Serve with vegetables.');


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

-- Seed recipe_ingredients
  -- Classic Bread
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (1, 1, 500.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (1, 4, 15.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (1, 3, 5.00, 'grams');

  -- Chocolate Cake
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (2, 1, 250.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (2, 2, 200.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (2, 9, 50.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (2, 7, 3.00, 'units');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (2, 6, 100.00, 'grams');

  -- Garlic Pasta
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (3, 11, 100.00, 'ml');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (3, 12, 30.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (3, 18, 150.00, 'grams');

  -- Grilled Chicken
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (4, 19, 500.00, 'grams');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (4, 11, 50.00, 'ml');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (4, 20, 2.00, 'units');
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES (4, 17, 5.00, 'grams');
