const express = require('express');
const router  = express.Router();
const axios = require ('axios');
const OpenAIApi = require('openai')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

const verifyObj = (object) => {
  const errorLog = [];

  let valid = false;
  try {
    JSON.parse(object);
    valid = true;
  } catch {
    errorLog.push("Format JSON");
    return errorLog;
  }



  object = JSON.parse(object);

  if (!object.hasOwnProperty("title")) {
    errorLog.push("Missing title");
  }
  if (!Array.isArray(object.tags)) {
    errorLog.push("Format tags not array");
  }
  if (!Array.isArray(object.steps)) {
    errorLog.push("Format steps not array");
  }
  if (!Array.isArray(object.ingredients)) {
    errorLog.push("Format ingredients not array");
  }
  for (let item of object.ingredients) {
    if (!item.hasOwnProperty("name")) {
      errorLog.push("Missing ingredient.name");
    }
    if (!item.hasOwnProperty("quantity")) {
      errorLog.push("Missing ingredient.quantity");
    }
    if (item.quantity.search("/") !== -1) {
      errorLog.push(`Format quantity fraction ${item.id}`);
    }
    if (!item.hasOwnProperty("units")) {
      errorLog.push("Missing ingredient.units");
    }
    if (!item.hasOwnProperty("id")) {
      errorLog.push("Missing ingredient.id");
    }
  }
  return errorLog;
}


const req = {
  body: {
    allIngredients: [
      { id: 1, user_id: 1, name: 'Flour' },
      { id: 2, user_id: 1, name: 'Sugar' },
      { id: 3, user_id: 1, name: 'Salt' },
      { id: 4, user_id: 1, name: 'Yeast' },
      { id: 5, user_id: 1, name: 'Milk' },
      { id: 6, user_id: 1, name: 'Butter' },
      { id: 7, user_id: 1, name: 'Eggs' },
      { id: 8, user_id: 1, name: 'Baking Powder' },
      { id: 9, user_id: 1, name: 'Cocoa Powder' },
      { id: 10, user_id: 1, name: 'Vanilla Extract' }
    ],
    recipeTags: '',
    recipeFocus: '',
    recipeAvoid: '',
    recipeLimit: true
  }
}

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
    { "name": "Yeast", "quantity": 5, "units": "grams", "id": "2" }
  ]
}

const recipeSystemPrompt = `
Provide and format a Valid JSON format response.
Create a recipe based on user's prompt.
It should include the title of the recipe, ingredients that it needs,
tags that it fits into and the steps that are required to make it.
The data schema should follow this example \`${JSON.stringify(exampleJson)}\`
ONLY use the ingredients provied by the user, DO NOT ADD ANY OTHERS
Each ingredients object values should be in string format.
The units key cannot be left blank.
DO NOT USE FRACTIONS AT ALL`

const testPost = async (testObject) => {
  const { recipeTags, recipeFocus, recipeAvoid, allIngredients, oldRecipeTitle } = testObject.body;

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

  // Make the API request to OpenAI
  const errorLog = [];
  let errorCount = 0;
  let validCount = 0;

  for (let i = 0; i < 10; i++) {
    axios.post(
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
        // Extract AI response from the API response
        const aiResponseRaw = (response.data.choices[0].message.content);
        const aiResponse = aiResponseRaw.replace(/`{3}(json)?/g, '');  // Regular expression to remove all backticks
        return aiResponse;
        // ensure response type is in json format
        // console.log('AI recipe response:',aiResponse);
      })
      .then((data) => {
        const errors = verifyObj(data);
        console.log(data);
        if (errors.length > 0) {
          errorCount++;
        } else {
          validCount++;
        }
        errorLog.push(errors);
        console.log(errors);
        console.log("errorCount", errorCount);
        console.log("validCount", validCount);
      });

  }
};


testPost(req)

module.exports = router;
