import React, { useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Avatar,
  ListItem,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { applicationContext } from "../hooks/applicationContext";
import Loading from "./Loading";
import Error from "./Error";

function RecipeFullView() {

  const { state, dispatch } = useContext(applicationContext);
  
  const { activeRecipe, recipes, recipeIngredients, isLoading, error } = state;
  
  const recipe = recipes.find(r => r.id === activeRecipe);
  
  
  if (isLoading) return <Loading />
  if (error) return <Error />
  
  if (!recipe) return <div>No recipe found</div>;

  return (
    <Box sx={{ width: 0.43, height: 512 }}>
      
      <Typography
        variant="h1"
        component="h1"
        color="primary"
      >
        &#8226; recipe viewer
      </Typography>
      
      <Box sx={{
        flexGrow: 1,
        width: 1,
        maxWidth: 1,
        height: 43,
        maxHeight: 43,
        border: '2px solid',
        borderColor: state.themeColors.textColor,
        borderRadius: '10px',
        overflow: 'hidden',
        m: 0.6
      }}>
        <ListItem
          sx={{alignItems: "center"}}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch({type: "EDIT_CURRENT_RECIPE", payload: recipe.id})}
            >
              <EditIcon color="primary" />
            </IconButton>
          }
        >
          <Typography
            variant="h2"
            component="h2"
          >
            {recipe.title} - {recipe.tags}
          </Typography>
        </ListItem>
      </Box>
        
      <Paper sx={{ margin: 'auto', mt: 2, mb: 2, padding: 2, height: 1, overflow: 'auto' }}>
        <Typography
          variant="body1"
          component="p"
        >
          {Array.isArray(recipeIngredients) ? recipeIngredients.map(ing => `${ing.name} - ${ing.quantity} ${ing.units} \n`).join(', ') : "No ingredients"}
        </Typography>
        <Typography
          variant="body1"
          component="p"
        >
          {recipe.steps}
        </Typography>
      </Paper>
    </Box>
  )
}

export default RecipeFullView