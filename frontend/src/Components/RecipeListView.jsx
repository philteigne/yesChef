import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

function RecipeListView() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = 1;

  useEffect(() => {
    fetch(`/api/saved-recipes/${userId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        margin: 2,
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h2" gutterBottom>
            Saved Recipes
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "10px" }}
            >
              Button 1
            </Button>
            <Button variant="contained" color="secondary">
              Button 2
            </Button>
          </Box>
        </Box>
      </Box>
      {recipes.length > 0 ? (
        <Paper sx={{ maxWidth: 600, margin: "auto", mt: 2, mb: 2, padding: 2 }}>
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id} divider>
                <ListItemText
                  primary={<Typography variant="h6">{recipe.title}</Typography>}
                  secondary={recipe.tags}
                />
                <Button variant="contained" color="secondary">
                  Button 3
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: "center", my: 2 }}>
          No recipes found.
        </Typography>
      )}
    </Box>
  );
}

export default RecipeListView;
