const express = require('express');

const controller = require('../controllers/controller.js');

const validation = require('../helpers/validation.js');

const app = express();

// index + etc
app.get('/', controller.getIndex);

module.exports = app;