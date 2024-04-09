## /api/saved-recipes/#user_id
### GET:
Query database and return all saved recipes with a user_id that matches the current users id
### POST:
Query database and add a new recipe entry with user_id that matches current users id and selected recipe data

## /api/saved-recipes/#user_id/#recipe_id
### GET
View saved recipe item with an id that matches recipe_id
### UPDATE
Alter characteristics of a recipe
### DELETE
Delete saved recipe from saved recipe list


## /api/ingredients/#user_id
### GET
Retrieve list of users ingredients list
### POST
Add a new ingredient to the users saved list

## /api/ingredients/#user_id/#ingredient_id
### UPDATE
Change the name of a users stored ingredient
### DELETE
Delete saved ingredient from users ingredients list
