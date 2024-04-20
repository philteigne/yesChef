import React, { useEffect, useState } from 'react';

import { getSavedRecipes } from '/Users/spencerlewis/lighthouse/final_project/reverseRecipeLookup/backend/db/queries/users.js';

function UserRecipes({ userId }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getSavedRecipes(userId)
      .then(recipes => {
        setRecipes(recipes);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [userId]); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Saved Recipes</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.tags}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

export default UserRecipes;
