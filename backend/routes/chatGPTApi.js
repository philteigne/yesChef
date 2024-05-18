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
    { "name": "Flour", "quantity": 15.00, "units": "grams", "id": "1" },
    { "name": "Yeast", "quantity": 5.00, "units": "grams", "id": "2" }
  ]
}

const recipeSystemPrompt = `
Provide and format a Valid JSON format response.
Create a recipe based on user's prompt.
It should include the title of the recipe, ingredients that it needs,
tags that it fits into and the steps that are required to make it.
The data schema should follow this example \`${JSON.stringify(exampleJson)}\`
ONLY use the ingredients provied by the user, DO NOT ADD ANY OTHERS
ONLY USE FLOATING POINT UNITS AND MEASUREMENTS`

router.post('/', async (req, res) => {
  const { recipeTags, recipeFocus, recipeAvoid, allIngredients, oldRecipeTitle } = req.body;

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
  const userPrompt = !oldRecipeTitle? initialUserPrompt : userPromptRegenerate;

  try {
    // Make the API request to OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
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
    );

    // Extract AI response from the API response
    const aiResponseRaw = (response.data.choices[0].message.content);
    const aiResponse = aiResponseRaw.replace(/`{3}(json)?/g, '');  // Regular expression to remove all backticks
    // ensure response type is in json format
    console.log('AI recipe response:',aiResponse);

    res.type('json');
    res.status(200).send(aiResponse);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
