const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
const auth = require('./auth');
const users = require('./users');
const lists = require('./lists');
const food = require('./food');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.post('/v0/authenticate', auth.authenticate);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/v0/dummy', dummy.get);

// Your routes go here
// User Routes
app.get('/v0/signup', users.getUsers);
app.post('/v0/signup', users.postUser);

// List Routes
app.get('/v0/lists', lists.getLists);
app.get('/v0/users_lists', lists.getUsersToLists);
app.get('/v0/lists/:usr_id', auth.check, lists.getUsersLists);
app.post('/v0/lists/:usr_id', lists.newList);

// User from list Routes
app.get('/v0/users/:list_id', lists.getListsUsers);

// Food Routes
app.get('/v0/food', auth.check, food.getFood);
app.post('/v0/food', auth.check, food.postFood);
app.get('/v0/foodInList/:list_id', food.getFoodOfList);
app.post('/v0/foodInList/:list_id', food.postFoodInList);
app.put('/v0/food/:id', auth.check, food.putFood);
app.delete('/v0/food/:id', auth.check, food.deleteFood);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
