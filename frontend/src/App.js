import './App.css';
import React from 'react';
import Pantry from './Components/Pantry';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import RecipeListView from './Components/RecipeListView';
import RecipeFullView from './Components/RecipeFullView';
import ButtonAppBar from './Components/Navigation';
import { applicationContext } from './hooks/applicationContext';
import useApplicationData from './hooks/customHook';
import Parameters from './Components/Parameters';
import { Stack, CssBaseline } from '@mui/material'; 
import { useThemeContext } from './theme/ThemeContextProvider.tsx';
import { ThemeProvider } from '@emotion/react';

function App() {
  const { theme } = useThemeContext();
  const { state, dispatch } = useApplicationData();

  return (
    // wrapping context
    // value contains all the functions from useApplicationData that alter statesr
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <applicationContext.Provider value={{state, dispatch}}>
        <div>
          <ButtonAppBar />
          <Stack
            direction="row"
          >
            <Pantry  />
            <Parameters />
          </Stack>
          <div className="App">
            <RecipeListView />
            <RecipeFullView />
          </div>
        </div>
        </applicationContext.Provider>
      </ThemeProvider>
  );
}

export default App;
