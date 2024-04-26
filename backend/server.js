// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const cors = require('cors');


const PORT = process.env.PORT || 8080;
const app = express();


app.use(cors());

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const savedRecipesApiRoutes = require('./routes/savedRecipesApi');
const ingredientsApiRoutes = require('./routes/ingredientsApi');
const chatGPTApiRoutes = require('./routes/chatGPTApi');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/saved-recipes', savedRecipesApiRoutes);
app.use('/api/ingredients', ingredientsApiRoutes);
app.use('/api/chat-gpt', chatGPTApiRoutes);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
