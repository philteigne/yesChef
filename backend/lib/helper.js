const exampleJson = {
  "title": "Classic Bread",
  "tags": ["baking", "bread"],
  "steps": [
    "1. Mix ingredients.",
    "2. Knead dough.",
    "3. Let rise.",
    "4. Bake at 200°C for 30 minutes."
  ],
  "ingredients": [
    { "ingredient": "Flour", "quantity": 15.00, "units": "grams", "id": "1" },
    { "ingredient": "Yeast", "quantity": 5.00, "units": "grams", "id": "2" }
  ]
}

// write a function that converts array to string
/**
 *
 * @param {*} array
 * @returns tags as string for db query
 */
const tagsToString = (array) => {
  return array.join(", ");
}

// convert steps to string
const stepsToString = (array) => {
  return array.join(" ");
}

module.exports = {
  tagsToString,
  stepsToString
}
