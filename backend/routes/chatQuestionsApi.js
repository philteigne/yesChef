const express = require('express');
const router  = express.Router();
const axios = require ('axios');
const OpenAIApi = require('openai')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});


// Endpoint for chat
router.post('/', async (req, res) => {
  const { question } = req.body;
  const systemPrompt = `Answer the user's cooking-related questions accurately and succinctly...`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    console.log("OpenAI API full response:", response);


    const aiAnswer = response.data.choices[0].message.content;
    res.json({ answer: aiAnswer });
  } catch (error) {
    console.error('Failed to get answer from OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch the answer from OpenAI.' });
  }
});

module.exports = router;
