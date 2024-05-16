-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS recipe_ingredients;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  saved_by INTEGER REFERENCES users(id) on DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  tags VARCHAR(255) NOT NULL,
  steps TEXT NOT NULL
);

CREATE TABLE recipe_ingredients (
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity NUMERIC(5,2),
  units TEXT,
  PRIMARY KEY (recipe_id, ingredient_id)
);
