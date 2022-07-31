const express = require('express');

const authController = require('../controllers/auth-controller.js');
const eventController = require('../controllers/event-controller.js');
const app = express.Router();

// login
app.get('/', (req, res) => {
    res.redirect('/event-tracker/home');
});
app.get('/login', authController.getLogin);
app.get('/logout', authController.getLogout);

// authenticate user
app.post('/authenticate', authController.authenticate);

// event-tracker home
app.get('/event-tracker/home', eventController.getHome);

// event-tracker form
app.get('/event-tracker/create', eventController.getCreateEvent);
app.post('/event-tracker/submit', eventController.postCreateEvent);
app.get('/event-tracker/edit/:id', eventController.getEditEvent);
app.put('/event-tracker/edit', eventController.putEditEvent);
app.put('/event-tracker/cancel', eventController.putCancelEvent);
app.get('/event-tracker/print/:id', eventController.getPrintEvent);
app.put('/event-tracker/finish', eventController.putFinishEvent);

// event-tracker form data retrieval
app.get('/event-tracker/get/food', eventController.getFood);
app.get('/event-tracker/get/event', eventController.getEvent);
app.get('/event-tracker/get/charges', eventController.getCharges);
app.get('/event-tracker/get/packages', eventController.getPackages);
app.get('/event-tracker/check/event-availability', eventController.getCheckEventAvailability);

// event-tracker calendar
app.get('/event-tracker/calendar/:year/:month', eventController.getEventsInMonth);

// event-tracker pencilbooking list
app.route('/event-tracker/pencilbookings').get(eventController.getPencilBookings);
app.get('/event-tracker/pencilbookings/search', eventController.getPencilBookingsSearch);
app.get('/event-tracker/pencilbookings/filter', eventController.getPencilBookingsFilter);

// event-tracker reservation list
app.route('/event-tracker/reservations').get(eventController.getReservations);
app.get('/event-tracker/reservations/search', eventController.getReservationsSearch);
app.get('/event-tracker/reservations/filter', eventController.getReservationsFilter);

// event-tracker past events list
app.get('/event-tracker/pastevents', eventController.getPastEvents);
app.get('/event-tracker/pastevents/search', eventController.getPastEventsSearch);
app.get('/event-tracker/pastevents/filter', eventController.getPastEventsFilter);

// event-tracker cancelled events list
app.get('/event-tracker/cancelled', eventController.getCancelledEvents);
app.get('/event-tracker/cancelled/search', eventController.getCancelledEventsSearch);
app.get('/event-tracker/cancelled/filter', eventController.getCancelledEventsFilter);

// event-tracker past events list
app.get('/event-tracker/pastevents', eventController.getPastEvents);
app.get('/event-tracker/pastevents/search', eventController.getPastEventsSearch);
app.get('/event-tracker/pastevents/filter', eventController.getPastEventsFilter);

module.exports = app;
