import React from 'react';

import { Redirect } from "react-router-dom";
import CreateRecipe from './Components/CreateRecipe.jsx';
import ButtonAppBar from './Components/Navigation';
import { applicationContext } from './hooks/applicationContext';
import useApplicationData from './hooks/customHook';
import Parameters from './Components/Parameters';
import { Stack } from '@mui/material';
import HomePage from './Components/HomePage.jsx';
import SignInSide from './Components/Login.jsx';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline'


import { ThemeProvider } from '@mui/material/styles'
import customColorScheme from './styles/MuiTheme';
import './assets/fonts/fonts.css';
import ViewRecipe from './Components/ViewRecipe.jsx';

import ChatBubble from './Components/ChatBubble.jsx';
import ChatModal from './Components/ChatModal.jsx';

function App() {
  const { state, dispatch } = useApplicationData();

  function PrivateRoute({ component: Component, auth, ...rest }) {
    return (
      <Route {...rest} render={(props) => (
        auth ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />
    );
  }

  return (
    <ThemeProvider theme={customColorScheme(state.themeColors)}>
      <CssBaseline />
        <Router>
          <applicationContext.Provider value={{state, dispatch}}>
            <div>
              <ButtonAppBar />
              <ChatBubble />
              {state.chatModalOpen && <ChatModal />}
              <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/login' component={SignInSide} />
                <PrivateRoute path="/create-recipe" component={CreateRecipe} auth={state.isLoggedIn} />
                <PrivateRoute path="/view-recipe" component={ViewRecipe} auth={state.isLoggedIn} />
              </Switch>
            </div>
          </applicationContext.Provider>
        </Router>
    </ThemeProvider>
  );
  
}

export default App;

