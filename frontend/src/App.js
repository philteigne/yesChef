import React from 'react';
import Pantry from './Components/Pantry';

import RecipeListView from './Components/RecipeListView';
import RecipeFullView from './Components/RecipeFullView';
import ButtonAppBar from './Components/Navigation';
import { applicationContext } from './hooks/applicationContext';
import useApplicationData from './hooks/customHook';
import Parameters from './Components/Parameters';
import { Stack, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'


import { ThemeProvider} from '@mui/material/styles'
import customColorScheme from './styles/MuiTheme';
import './assets/fonts/fonts.css';

const themeColors = {
  bgColor: '#EAE7DC',
  textColor: '#4A4A45',
  accentColor: '#E85A4F'
}

const theme = customColorScheme(themeColors)

function App() {
  
  const { state, dispatch } = useApplicationData();

  return (
    // wrapping context
    // value contains all the functions from useApplicationData that alter states
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <applicationContext.Provider value={{state, dispatch}}>
        <Box sx={{ backgroundColor: '#EAE7DC',}}>
          <ButtonAppBar />
          <Stack
            direction="row"
            justifyContent='center'
            spacing={12}
          >
            <Pantry  />
            <Parameters />
          </Stack>
          <Stack
            direction="row"
            justifyContent='center'
            spacing={12}
          >
            <RecipeListView />
            <RecipeFullView />
          </Stack>
        </Box>
        </applicationContext.Provider>
    </ThemeProvider>
  );
}

export default App;

