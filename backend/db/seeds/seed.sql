INSERT INTO users (email, password_hash) VALUES ('john.doe@example.com', 'hashedpassword123');
INSERT INTO users (email, password_hash) VALUES ('jane.smith@example.com', 'hashedpassword456');
-- Seed recipes
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Classic Bread', 'baking, bread', '1. Mix ingredients. 2. Knead dough. 3. Let rise. 4. Bake at 200°C for 30 minutes.');
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(1, 'Chocolate Cake', 'baking, dessert', '1. Mix dry ingredients. 2. Add wet ingredients. 3. Mix well. 4. Bake at 175°C for 45 minutes.');

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
