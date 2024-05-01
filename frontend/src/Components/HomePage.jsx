import React from "react";
import { useHistory } from 'react-router-dom';

import mainImage from '../assets/images/Designer.jpeg'
import '../HomePage.css'

import Button from '@mui/material/Button';

const HomePage = () => {

  const history = useHistory();

  const handleClick = () => {
    // Navigate to a different route
    history.push('/create-recipe');
  }

  return (
    <div className="homepage-container">
      <div className="app-introduction">
        <h1>Welcome to Yes Chef  your personal AI recipe app</h1>
        <p>
          Yes Chef helps you organize your favorite recipes, manage your pantry, and discover new culinary delights.
        </p>
        <p>
          Whether you're a seasoned chef or just getting started in the kitchen, Yes Chef has everything you need to create delicious meals with ease.
        </p>
        <Button size="large" variant="contained" onClick={handleClick}>Get Started</Button>
      </div>
      <div className="main-image">
        <img src={mainImage} alt="person cooking with the help of AI generate recipe"></img>
      </div>

    </div>
  );
};

export default HomePage