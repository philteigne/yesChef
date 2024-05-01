import React from 'react';
import Pantry from './Components/Pantry';

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
import CssBaseline from '@mui/material/CssBaseline'


import { ThemeProvider} from '@mui/material/styles'
import customColorScheme from './styles/MuiTheme';
import './assets/fonts/fonts.css';


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
                </Stack>
              </Router>
              <Router path="/view-recipe">
                <RecipeListView />
                <RecipeFullView />
                <RecipeResponseView />
              </Router>
            </Switch>
        </div>
      </applicationContext.Provider>
    </Router>
  );
}

export default App;

