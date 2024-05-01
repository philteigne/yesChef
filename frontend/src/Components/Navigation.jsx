import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';

import YesChefLogo from '../icons/yesChefLogo';
import { applicationContext } from '../hooks/applicationContext';

import { AppBar, Toolbar, Typography, Box, Icon } from '@mui/material';


export default function ButtonAppBar() {
  // mode from useThemeContext "light", "dark"
  const history = useHistory();

  const homeIconClick = () => {
    // Navigate to a different route
    history.push('/');
  }

  const viewRecipeClick = () => {
    // Navigate to a different route
    history.push('/view-recipe')
  }

  const createRecipeClick = () => {
    // Navigate to a different route
    history.push('/create-recipe');
  }
  
  const pages = [
    {
      id: 0,
      text: 'HOME',
      action: homeIconClick,
    },
    {
      id: 1,
      text: 'PANTRY',
      action: createRecipeClick,
    },
    {
      id: 2,
      text: 'RECIPES',
      action: viewRecipeClick,
    },
    {
      id: 3,
      text: 'LOGIN',
      action: () => console.log("Login Clicked")
    },
    {
      id: 4,
      text: 'SIGNUP',
      action: () => console.log("Signup Clicked")
    },
  ]
    
  // const pages = ['HOME', 'RECIPES', 'LOGIN', 'SIGNUP']

  const { state } = useContext(applicationContext);
  return (
    <AppBar >
      <Toolbar>
        <Box sx={{ visibility: 'hidden', display: 'flex', justifyContent: "flex-end", justifySelf: 'flex-end', m: 0.4 }} >
          {pages.map((page) => (
            <Box sx={{ marginRight: 3 }}>
              <Typography
                variant="h3"
                component="h3"
                key={page.id}
                onClick={page.action}
              >
                {page.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Icon sx={{ height: 135, width: 212}}>
          <YesChefLogo fillColor={state.themeColors.accentColor}/>
        </Icon>
        <Box sx={{ display: 'flex', justifyContent: "flex-end", justifySelf: 'flex-end', m: 0.4 }} >
          {pages.map((page) => (
            <Box sx={{ marginRight: 3 }}>
              <Typography
                variant="h3"
                component="h3"
                key={page.id}
                onClick={page.action}
              >
                {page.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
