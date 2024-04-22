import React from 'react';
import IngredientList from './IngredientList';

const Pantry = () => {
  return (
    <div>
      <div>
        <h2>Pantry</h2>
        <div>
          <button>Categories</button>
          <button>All</button>
        </div>
      </div>
      <IngredientList />
    </div>
  )
}

export default Pantry;
