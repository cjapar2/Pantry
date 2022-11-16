const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
const users = require('./users');
const auth = require('./auth');
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

// Food Routes
app.get('/v0/food', auth.check, food.getFood);
app.post('/v0/food', auth.check, food.postFood);
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
