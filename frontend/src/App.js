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
import Loading from './Components/Loading.jsx';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline'


import { ThemeProvider } from '@mui/material/styles'
import customColorScheme from './styles/MuiTheme';
import './assets/fonts/fonts.css';

import ChatBubble from './Components/ChatBubble.jsx';
import ChatModal from './Components/ChatModal.jsx';

function App() {
  const { state, dispatch } = useApplicationData();

  return (
    <ThemeProvider theme={customColorScheme(state.themeColors)}>
      <CssBaseline />
      <Router>
        <applicationContext.Provider value={{ state, dispatch }}>
          <div>
            <ButtonAppBar />
            <ChatBubble />
            {state.chatModalOpen && <ChatModal />}
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Router path="/create-recipe">
                <Stack
                  direction="row"
                  justifyContent='center'
                  spacing={12}
                >
                  <Pantry />
                  {state.isLoading && <Loading />}
                  {!state.isLoading && !state.recipeResponse && <Parameters />}
                  {!state.isLoading && state.recipeResponse && <RecipeResponseView />}
                </Stack>
              </Router>
              <Router path="/view-recipe">
                <Stack
                  direction="row"
                  justifyContent='center'
                  spacing={12}
                >
                  <RecipeListView />
                  <RecipeFullView />
                </Stack>
              </Router>
            </Switch>
          </div>
        </applicationContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

