INSERT INTO users (email, password_hash) VALUES ('john.doe@example.com', 'hashedpassword123');
INSERT INTO users (email, password_hash) VALUES ('jane.smith@example.com', 'hashedpassword456');
-- password for carmen is yeschef
INSERT INTO users (email, password_hash) VALUES ('carmy', '$2b$10$9Dhf.a82S8YXKm6iw6pxhOZqLXmRCfA6Bl7Q1vYje6v5U0yK2vIQe');

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
INSERT INTO ingredients (user_id, name) VALUES (1, 'Flour');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Sugar');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Salt');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Yeast');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Milk');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Butter');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Eggs');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Baking Powder');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Cocoa Powder');
INSERT INTO ingredients (user_id, name) VALUES (1, 'Vanilla Extract');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Olive Oil');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Garlic');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Onions');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Tomatoes');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Basil');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Parsley');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Black Pepper');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Cheese');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Pasta');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Rice');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Bread Crumbs');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Parmesan Reggiano');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Spaghetti');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Linguine');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Heavy Cream');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Shrimp');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Ground Beef');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Chicken Breast');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Peeled Can Tomato');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Pesto');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Flour');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Eggs');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Lemon');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Ravioli');
INSERT INTO ingredients (user_id, name) VALUES (2, 'Milk');

-- Slow-Cooker Flank Steak Au Jus Sandwiches
INSERT INTO ingredients (user_id, name) VALUES
(3, 'Olive oil'),
(3, 'Dark brown sugar'),
(3, 'Kosher salt'),
(3, 'Ground cumin'),
(3, 'Paprika'),
(3, 'Black pepper'),
(3, 'Garlic cloves'),
(3, 'Flank steak'),
(3, 'Large onion'),
(3, 'Yuengling Lager'),
(3, 'Soy Sauce'),
(3, 'Bay leaf'),
(3, 'Cornstarch'),
(3, 'Hoagie rolls');

-- Adding the Slow-Cooker Flank Steak Au Jus Sandwiches recipe
INSERT INTO recipes (saved_by, title, tags, steps) VALUES
(3, 'Slow-Cooker Flank Steak Au Jus Sandwiches', 'slow cooker, beef',
'1. Combine spices, sugar, and oil to create a marinade. 2. Rub marinade on steak and place in slow cooker.
3. Add onions, garlic, bay leaf, and Yuengling Lager. 4. Cook on low for 8 hours. 5. Remove steak and shred.
6. Mix cornstarch with water and add to slow cooker to thicken sauce. 7. Serve on hoagie rolls.');




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


-- Slow-Cooker Flank Steak Au Jus Sandwiches
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, units) VALUES
(5, 21, 1.5, 'tablespoons'),
(5, 22, 2, 'tablespoons'),
(5, 23, 0.75, 'teaspoon'),
(5, 24, 1, 'teaspoon'),
(5, 25, 1, 'teaspoon'),
(5, 26, 1, 'teaspoon'),
(5, 27, 3, 'units'),
(5, 28, 2, 'pounds'),
(5, 29, 1, 'units'),
(5, 30, 12, 'ounce'),
(5, 31, 2, 'tablespoons'),
(5, 32, 1, 'units'),
(5, 33, 2, 'teaspoons'),
(5, 34, 8, 'units');
