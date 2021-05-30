//const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController = {
    getLogin: function (req, res) {
        res.render('login');
    },

    postLogin: function (req, res) {
        //var errors = validationResult(req);
        var username = req.body.username;
        var password = req.body.password;

        // if (!errors.isEmpty()) {
        //     errors = errors.errors;

        //     var details = {};

        //     for(i = 0; i < errors.length; i++)
        //         details[errors[i].param + 'Error'] = errors[i].msg;

        //     res.render('login', details);
        // }

        // else {
            db.findOne(User, {username: username}, '', function (result) {
                if(result) {
                    bcrypt.compare(password, result.password, function(err, equal) {
                        if(equal) {
                            req.session.username = result.username;
                            res.redirect('/home');
                        }

                        else {
                            var details = {
                                flag: false,
                                error: `INCORRECT username and/or password.`
                            };

                            res.render('login', details);
                        }
                    });
                }

                else {
                    var details = {
                        flag: false,
                        error: `INCORRECT username and/or password.`
                    };

                    res.render('login', details);
                }
            });
        // }  
    }
}

module.exports = loginController;