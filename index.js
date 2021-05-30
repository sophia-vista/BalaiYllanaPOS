const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const validator = require('validator');
const dotenv = require (`dotenv`);
const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const app = express();
dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(session({
    secret: 'gerphis',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 
        'mongodb+srv://admin1:admin@cluster0.barb2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
}));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
}));


app.use(bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.use(express.static('public'));


app.use('/', routes);

// app.use(function(err, req, res, next){
//     res.status(err.status);
//     res.render('error', { 
//         error: err,
//         code: err.status
//      });
// });

// app.use(function (req, res) {
//     var details = {
//         error: "Error: Page not found.",
//         code: "404"
//     };
//    res.render('error', details);
// });

db.connect();

app.listen(port, () => {
    console.log('The web server has started on port ' + port);
});
