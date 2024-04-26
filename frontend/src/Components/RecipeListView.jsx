import React, { useContext } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Button } from "@mui/material";
import { applicationContext } from '../hooks/applicationContext';
import Loading from "./Loading";
import Error from "./Error";

function RecipeListView() {

  const { state, dispatch } = useContext(applicationContext);
  const { recipes, isLoading, error } = state;

  if (isLoading) return <Loading />
  if (error) return <Error />

  return (
    <Box
      sx={{
        margin: 2,
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}>
      <Box sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h2" gutterBottom>
            Saved Recipes
          </Typography>
          <Box>
            <Button variant="contained" color="primary" sx={{ marginRight: "10px" }}>
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
                <Button variant="contained" color="secondary" onClick={() => {dispatch({type: 'SET_ACTIVE_RECIPE', payload: recipe.id})}}>
                  View Recipe
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
