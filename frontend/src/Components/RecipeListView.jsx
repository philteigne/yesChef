import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function RecipeListView() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = 1;

  useEffect(() => {
    fetch(`/api/saved-recipes/${userId}`)  
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRecipes(data);
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
    <div style={{ margin: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Saved Recipes
      </Typography>
      {recipes.length > 0 ? (
        <Paper style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
          <List>
            {recipes.map(recipe => (
              <ListItem key={recipe.id} divider>
                <ListItemText
                  primary={<Typography variant="h6">{recipe.title}</Typography>}
                  secondary={recipe.tags}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="subtitle1">No recipes found.</Typography>
      )}
    </div>
  );
}

export default RecipeListView;
