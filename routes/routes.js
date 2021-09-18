const express = require('express');

const controller = require('../controllers/controller.js');
const eventController = require('../controllers/event-controller.js');

const validation = require('../helpers/validation.js');

const app = express();

// index + etc
app.get('/', controller.getIndex);

app.get('/event-tracker', eventController.getToday);


module.exports = app;