//import the necessary modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js')
const mongoose = require('mongoose');
const db = require('./models/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

process.env.HOSTNAME = "localhost"
process.env.PORT = "3000"
process.env.DB_URL = "mongodb+srv://pia:balaiyllanagarden@balai-yllana.n8hr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//parse incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: false}));
//set the file path containing the static assets
app.use(express.static(path.join(__dirname, 'public')));
//set the session middleware
app.use(
    session({
        secret: 'balai-yllana',
        resave: 'false',
        saveUninitialized: 'false',
        store: MongoStore. create({mongoUrl: process.env.DB_URL})
    })
);
//set hbs as the view engine
app.set('view engine', 'hbs');
//set the file path containing the hbs files
app.set('views', path.join(__dirname, 'views'))
//set the file path of the paths defined in './routes/routes.js'
app.use('/', routes);
//set the file path containing the partial hbs files
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//connect to the database
db.connect();

//bind the server to a port and a host
app.listen(process.env.PORT, process.env.HOSTNAME, function() {
    console.log(`Server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});

module.exports = app;
