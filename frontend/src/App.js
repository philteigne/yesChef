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
import { Stack } from '@mui/material'; 

function App() {
  
  const { state, dispatch } = useApplicationData();

  return (
    // wrapping context
    // value contains all the functions from useApplicationData that alter states
    
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
  );
}

export default App;
