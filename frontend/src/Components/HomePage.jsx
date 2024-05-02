import React, { useContext } from "react";
import { applicationContext } from "../hooks/applicationContext";
import { useHistory } from 'react-router-dom';

import mainImage from '../assets/images/Designer.jpeg'
import '../HomePage.css'

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const HomePage = () => {

  const history = useHistory();

  const handleClick = () => {
    // Navigate to a different route
    history.push('/create-recipe');
  } 

  const { state } = useContext(applicationContext);

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
          style={{ marginBottom: '20px' }}
        >
          Yes Chef helps you organize your favorite recipes, manage your pantry, and discover new culinary delights.
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          color="secondary"
          style={{ marginBottom: '20px' }}
        >
          Whether you're a seasoned chef or just getting started in the kitchen, Yes Chef has everything you need to create delicious meals with ease.
        </Typography>
        <Button size="large" variant="contained" onClick={handleClick} styles={{margin: '10px'}}>Get Started</Button>
      </div>
      <div className="main-image">
        <img src={mainImage} alt="person cooking with the help of AI generate recipe"></img>
      </div>

    </div>

    // </ThemeProvider>
  );
};

export default HomePage