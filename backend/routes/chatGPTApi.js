const express = require('express');
const router  = express.Router();
const axios = require ('axios');
const OpenAIApi = require('openai')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

// use this example JSON in system prompt to make sure it returns the JSON format we want
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
    { "name": "Flour", "quantity": 15, "units": "grams", "id": "1" },
    { "name": "Yeast", "quantity": 0.5, "units": "tablespoons", "id": "2" }
  ]
}

const recipeSystemPrompt = `
Provide and format a Valid JSON format response.
Create a recipe based on user's prompt.
It should include the title of the recipe, ingredients that it needs,
tags that it fits into and the steps that are required to make it.
The data schema should follow this example \`${JSON.stringify(exampleJson)}\`
Only use the ingredients provied by the user.
Do not add any ingredients that are not provided by the user.
Within the ingredients array,
the name key should contain a string of the ingredient name.
the quantity key should contain a numerical decimal value representing the quantity of the ingredient,
the units key should contain a string containing the measuring unit of the ingredient,
the id key should contain a numerical integer representing the id of the ingredient that was provided by the user.
All keys in the example object are necessary and will result in an error if they are not all present or have an incorrect value type.
`
const verifyResponseObj = (object) => {

  try {
    JSON.parse(object);
  } catch {
    return false;
  }

  object = JSON.parse(object);
  // .title
  if (!object.hasOwnProperty("title")) {
    return false;
  }
  else if (typeof object.title !== "string") {
    return false;
  }
  // .tags
  if (!Array.isArray(object.tags)) {
    return false;
  } else if (object.tags.length > 0) {
    for (let item of object.tags) {
      if (typeof item !== "string") {
        return false;
      }
    }
  }
  // .steps
  if (!Array.isArray(object.steps)) {
    return false;
  } else if (object.steps.length > 0) {
    for (let item of object.tags) {
      if (typeof item !== "string") {
        return false;
      }
    }
  }

  if (!Array.isArray(object.ingredients)) {
    return false;
  } else {
    for (let item of object.ingredients) {
      // .name
      if (!item.hasOwnProperty("name")) {
        return false;
      }
      else if (typeof item.name !== "string") {
        return false;
      }

      // .quantity
      if (!item.hasOwnProperty("quantity")) {
        return false;
      }
      else if (typeof item.quantity !== "number") {
        if (item.quantity === null) {
          return false;
        }
        else if (item.quantity.search("/") !== -1) {
          return false;
        }
      }

      // .units
      if (!item.hasOwnProperty("units")) {
        return false;
      }
      else if (typeof item.name !== "string") {
        return false;
      }

      // .id
      if (!item.hasOwnProperty("id")) {
        return false;
      }
      else if (typeof item.name !== "number" && typeof item.name !== "string") {
        return false;
      }
    }
  }
  return true;
}

const cleanResponseObj = (object) => {
  let objectParse = JSON.parse(object)
  objectParse.ingredients = objectParse.ingredients.filter((a) => a.quantity > 0)
  return JSON.stringify(objectParse)
}

const requestRecipeGen = async (requestBody) => {
  const { recipeTags, recipeFocus, recipeAvoid, allIngredients, oldRecipeTitle } = requestBody;

  const initialUserPrompt = `
    Given ONLY these ingredients: ${JSON.stringify(allIngredients)}, your task is to craft a recipe that fits the provided tags: ${recipeTags}.
    However, please try to use these ingredients: ${recipeFocus}, and avoid incorporating the following ingredients: ${recipeAvoid}.
    DO NOT ADD INGREDIENTS THAT I DON'T HAVE.
  `;

  const userPromptRegenerate = `
    You have generated a recipe called ${oldRecipeTitle} earlier, which the user did not like it.
    Please come up with a different recipe that is very different from the last one. Given ONLY these ingredients: ${JSON.stringify(allIngredients)},
    your task is to craft a recipe that fits the provided tags: ${recipeTags}.
    However, please try to use these ingredients: ${recipeFocus}, and avoid incorporating the following ingredients: ${recipeAvoid}.
    DO NOT ADD INGREDIENTS THAT I DON'T HAVE.
  `;

  // if oldRecipe is in req.body, use userPromptRegenerate
  const userPrompt = !oldRecipeTitle ? initialUserPrompt : userPromptRegenerate;

  for (let i = 0; i < 10; i++) {
    return axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        response_format: { type: "json_object" },
        messages: [
          { role: 'system', content: recipeSystemPrompt },
          { role: 'user', content: userPrompt }
        ],
        // Temperature controls how unexpected the output can be, 0 being most conservative
        temperature: 0.8
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    )
      .then((response) => {
        console.log("response", response.data.choices[0].message.content)
        const aiResponse = (response.data.choices[0].message.content)
        if (verifyResponseObj(aiResponse)) {
          return cleanResponseObj(aiResponse);
        };
      })
  }
}

router.post('/', async (req, res) => {
  requestRecipeGen(req.body)
    .then((response) => {
      res.type('json');
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error('An error occurred:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    })
});

module.exports = router;
