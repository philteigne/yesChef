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
  // .title
  if (!object.hasOwnProperty("title")) {
    errorLog.push("Missing title");
  }
  else if (typeof object.title !== "string") {
    errorLog.push(`Unexpected title type ${typeof object.title}`)
  }
  // .tags
  if (!Array.isArray(object.tags)) {
    errorLog.push("Format tags not array");
  } else if (object.tags.length > 0) {
    for (let item of object.tags) {
      if (typeof item !== "string") {
        errorLog.push(`Unexpected tag type ${typeof item}`)
      }
    }
  }
  // .steps
  if (!Array.isArray(object.steps)) {
    errorLog.push("Format steps not array");
  } else if (object.steps.length > 0) {
    for (let item of object.tags) {
      if (typeof item !== "string") {
        errorLog.push(`Unexpected tag type ${typeof item}`)
      }
    }
  }

  if (!Array.isArray(object.ingredients)) {
    errorLog.push("Format ingredients not array");
  } else {
    for (let item of object.ingredients) {
      // .name
      if (!item.hasOwnProperty("name")) {
        errorLog.push("Missing ingredient.name");
      }
      else if (typeof item.name !== "string") {
        errorLog.push(`Unexpected name type ${typeof item.name}`)
      }

      // .quantity
      if (!item.hasOwnProperty("quantity")) {
        errorLog.push("Missing ingredient.quantity");
      }
      else if (typeof item.quantity !== "number") {
        if (item.quantity === null) {
          errorLog.push(`Format quantity null ${item.id}`);
        }
        else if (item.quantity.search("/") !== -1) {
          errorLog.push(`Format quantity fraction ${item.id}`);
        }
      }

      // .units
      if (!item.hasOwnProperty("units")) {
        errorLog.push("Missing ingredient.units");
      }
      else if (typeof item.name !== "string") {
        errorLog.push("Unexpected units type")
      }

      // .id
      if (!item.hasOwnProperty("id")) {
        errorLog.push("Missing ingredient.id");
      }
      else if (typeof item.name !== "number" && typeof item.name !== "string") {
        errorLog.push(`Unexpected id type ${typeof item.id}`)
      }
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

  for (let i = 0; i < 100; i++) {
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
        const aiResponse = (response.data.choices[0].message.content)
        console.log("-----")
        console.log("aiResponse", aiResponse);
        const errors = verifyObj(aiResponse);
        if (errors.length > 0) {
          errorCount++;
        } else {
          validCount++;
        }
        errorLog.push(errors);
        console.log(errors);
        console.log("errorCount", errorCount);
        console.log("validCount", validCount);
        console.log("-----")
      });
  }
};


testPost(req)

module.exports = router;
