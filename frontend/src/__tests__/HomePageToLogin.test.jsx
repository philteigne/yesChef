import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../Components/HomePage';
import { applicationContext } from '../hooks/applicationContext';
import useApplicationData from '../hooks/customHook';
import { Route, Redirect, Switch } from 'react-router-dom';
import CreateRecipe from '../Components/CreateRecipe';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../hooks/customHook')

describe('HomePage component Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function PrivateRoute({ component: Component, auth, ...rest }) {
    return (
      <Route {...rest} render={(props) => (
        auth ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />
    );
  }

  function HomePageTest () {
    const { state } = useApplicationData();
  
    return(
      <MemoryRouter initialEntries={['/create-recipe']}>
      <applicationContext.Provider value={{ state }}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute path="/create-recipe" component={CreateRecipe} auth={state.isLoggedIn} />
        </Switch>
      </applicationContext.Provider>
    </MemoryRouter>
    )
  }
  
  it('should navigate user to /create-recipe when user is logged in', () => {

    useApplicationData.mockReturnValue({
      state: { 
        isLoggedIn: true,
        themeColors: {
          bgColor: '#EAE7DC',
          textColor: '#4A4A45',
          accentColor: '#E85A4F'
        },
        ingredientList: [
          {
            "id": 21,
            "user_id": 3,
            "name": "Olive oil",
            "quantity": "1.50",
            "units": "tablespoons"
          }
        ]
      },
      dispatch: jest.fn()
    });

    render(<HomePageTest/>)
    expect(screen.getByTestId('pantry-component')).toBeInTheDocument()
  })

})