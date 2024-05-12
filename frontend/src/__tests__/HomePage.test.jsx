import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../Components/HomePage';

import { applicationContext } from '../hooks/applicationContext';
import useApplicationData from '../hooks/customHook';

import { BrowserRouter as Router } from 'react-router-dom';

it('HomePage component renders without crashing', () => {

  function HomePageTest () {
    const { state, dispatch } = useApplicationData();
  
    return(
        <Router>
          <applicationContext.Provider value={{state, dispatch}}>
            <HomePage />
          </applicationContext.Provider>
        </Router>
    )
  }

  const { getByText } = render(<HomePageTest />)
  expect(getByText("Get Started")).toBeInTheDocument()

  });