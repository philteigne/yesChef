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
import HomePage from './Components/HomePage.jsx';
import RecipeResponseView from './Components/RecipeResponseView.jsx';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const { state, dispatch } = useApplicationData();

  return (
    // wrapping context
    // value contains all the functions from useApplicationData that alter states
    <Router>
      <applicationContext.Provider value={{state, dispatch}}>
        <div>
          <ButtonAppBar />
            <Switch>
              <Route path='/' exact component={HomePage}/>
              <Router path="/create-recipe">
                <Stack direction="row">
                  <Pantry  />
                  <Parameters />
                  <RecipeResponseView />
                </Stack>
              </Router>
              <Router path="/view-recipe">
                <RecipeListView />
                <RecipeFullView />
              </Router>
            </Switch>
        </div>
      </applicationContext.Provider>
    </Router>
  );
}

export default App;
