import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import HomePage from '../HomePage';
import { applicationContext } from '../../hooks/applicationContext';
import useApplicationData from '../../hooks/customHook';
import { BrowserRouter as Router } from 'react-router-dom';

describe('HomePage component Test', () => {
  afterEach(cleanup);
  
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
  
  it('HomePage component renders without crashing', () => {
    render(<HomePageTest />)
    expect(screen.getByText("Get Started")).toBeInTheDocument()
    expect(window.location.href).toBe('http://localhost/')
  });
  
  it('should navigate to login when user click get started', () => {
    render(<HomePageTest/>)
    fireEvent.click(screen.getByText(/get started/i))
    expect(window.location.href).toBe('http://localhost/login')
  })

})