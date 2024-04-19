import React from "react";

const IngredientListItem = ({ingredient}) => {
  return (
    <div>
      <li>
        {ingredient.name}
      </li>
    </div>
  )
}

export default IngredientListItem;