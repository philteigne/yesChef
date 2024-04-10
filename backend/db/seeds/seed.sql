-- Seed users with plain text passwords
INSERT INTO users (email, password_hash) VALUES
  ('user1@example.com', 'password1'),
  ('user2@example.com', 'password2'),
  ('user3@example.com', 'password3');

-- Seed recipes
INSERT INTO recipes (saved_by, title, tags, ingredients, steps) VALUES
  (1, 'Recipe 1', 'tag1, tag2', 'Ingredient 1, Ingredient 2', 'Step 1, Step 2, Step 3'),
  (2, 'Recipe 2', 'tag3, tag4', 'Ingredient 3, Ingredient 4', 'Step 1, Step 2, Step 3'),
  (3, 'Recipe 3', 'tag5, tag6', 'Ingredient 5, Ingredient 6', 'Step 1, Step 2, Step 3');

-- Seed ingredients
INSERT INTO ingredients (user_id, name) VALUES
  (1, 'Ingredient 1'),
  (1, 'Ingredient 2'),
  (2, 'Ingredient 3'),
  (2, 'Ingredient 4'),
  (3, 'Ingredient 5'),
  (3, 'Ingredient 6');

