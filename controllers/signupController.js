//const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {
    getSignUp: function (req, res) {
        res.render('signup');
    },

    postSignUp: function (req, res) {
        // var errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     errors = errors.errors;

        //     var details = {};

        //     for(i = 0; i < errors.length; i++)
        //         details[errors[i].param + 'Error'] = errors[i].msg;
            
        //     res.render('signup', details);
        // }

        // else {
            var username = req.body.username;
            var password = req.body.password;
            var email = req.body.email;           

            bcrypt.hash(password, saltRounds, function(err, hash) {

                var user = {
                    username: username,
                    password: hash,
                    email: email                   
                }
   
                db.insertOne(User, user, function(flag) {
                    if(flag) {
                        res.redirect('/login');
                    }
                });
            });
        // }
    },

    getCheckUsername: function (req, res) {
        var username = req.query.username;
        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    }
}

module.exports = signupController;