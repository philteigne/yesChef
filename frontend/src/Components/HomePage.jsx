import React, { useContext } from "react";
import { applicationContext } from "../hooks/applicationContext";

import kirby from '../assets/images/HnK_Cook_2.webp'
import '../HomePage.css'
import useLastVisitedUrl from "../hooks/useLastVisitedUrl";

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const HomePage = () => {

  const { state } = useContext(applicationContext);
  const history = useLastVisitedUrl()
  // console.log(history);
  const handleClick = () => {
    // Navigate to create-recipe if user is logged in
    if (state.isLoggedIn) {
      history.push('/create-recipe');
    }
    // Navigate to login page if user is not logged in
    history.push('/login');
  } 


  return (
    // <ThemeProvider theme={theme}>
    <div className="homepage-container" style={{
      backgroundColor: state.themeColors.bgColor
    }}>
      <div className="app-introduction">
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          style={{ fontSize: '2.5rem', marginBottom: '30px' }}
        >
          Welcome to Yes Chef  your personal AI recipe app
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          color="secondary"
          style={{ marginBottom: '20px', maxWidth: '600px' }}
        >
          Yes Chef helps you organize your favorite recipes, manage your pantry, and discover new culinary delights.
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          color="secondary"
          style={{ marginBottom: '20px', maxWidth: '600px' }}
        >
          Whether you're a seasoned chef or just getting started in the kitchen, Yes Chef has everything you need to create delicious meals with ease.
        </Typography>
        <Button size="large" variant="contained" onClick={handleClick} styles={{margin: '10px'}}>Get Started</Button>
      </div>
      <div className="main-image">
        <img src={kirby} alt="person cooking with the help of AI generate recipe"></img>
      </div>

    </div>

    // </ThemeProvider>
  );
};

export default HomePage