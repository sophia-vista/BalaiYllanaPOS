const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');
const Article = require('../models/ArticleModel.js');
const Quiz = require('../models/QuizModel.js');
const Comment = require('../models/CommentModel.js');
const User = require('../models/UserModel.js');
const { validationResult } = require('express-validator');

const controller = {
    getIndex: function (req, res) {
        db.findRecent(Article, function(articles){
            db.findRecent(Quiz, function(quizzes){
                var details = {
                    articles : articles, 
                    quizzes: quizzes, 
                    username: req.session.username
                };
                
                res.render('index', details);
            });
        });  
    },

    getAboutUs: function (req, res) {
        res.render('about-us');
    }, 

    getSearch : function (req, res) {
        var search = req.query.search;
        var regex = new RegExp(".*" + search + ".*", "i");
        
        db.findMany (Article, {title : regex}, '', function (articles) {
             db.findMany (Quiz, {title : regex}, '', function (quizzes) { 
                var details = {
                    search : search,
                    articles : articles, 
                    quizzes: quizzes, 
                    username: req.session.username
                };
                res.render ('search', details);
            });
        });
    },

    getProfile : function (req, res) {
        db.findOne (User, {username : req.session.username}, '', function (user) {
             db.findMany (Comment, {author : req.session.username}, '', function (comments) { 
                res.render ('profile', {user : user, comments : comments, username : req.session.username});
            });
        });
    },

    postEditProfile : function (req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            errors = errors.errors;
            var details = {};
            
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            db.findOne (User, {username : req.session.username}, '', function (user) {
                details.user = user;
                res.render('profile', details);
            });
            
        }
        else
        {
            db.findOne (User, {username : req.session.username}, '', function (user) {
                bcrypt.compare(req.body.edit_password, user.password, function(err, equal) {
                    if(equal) {
                        bcrypt.hash(req.body.new_password, saltRounds, function(err, hash) {
                            var update = user;
                            if (req.body.username != '') update.username = req.body.username;
                            if (req.body.email != '') update.email = req.body.email;
                            if (req.body.new_password != '') update.password = hash;
                            db.updateOne(User, {username: req.session.username}, update, function(flag) {
                                db.updateMany(Comment, {author: user.username}, {author: update.username}, function(flag) {
                                    if (req.body.username != '')
                                        req.session.username = update.username;
                                    res.redirect('/profile');
                                });
                            });
                        });
                    }
                    else {
                        var details = {edit_passwordError : 'Incorrect password. Please try again.'}
                        db.findOne (User, {username : req.session.username}, '', function (user) {
                             db.findMany (Comment, {author : req.session.username}, '', function (comments) { 
                                details.user = user;
                                details.username = user.username;
                                details.comments = comments;
                                res.render ('profile', details);
                            });
                        });
                    }
                });
            });
        }            
    },

    getCheckUsername: function (req, res) {
        var username = req.query.username;
        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    },

    getCheckEmail: function (req, res) {
        var email = req.query.email;
        db.findOne(User, {email: email}, 'email', function (result) {
            res.send(result);
        });
    },

    postDelProfile : function (req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            errors = errors.errors;
            var details = {};
            
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            db.findOne (User, {username : req.session.username}, '', function (user) {
                details.user = user;
                res.render('profile', details);
            });
            
        }
        
        else
        {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                if (req.body.c_password == req.body.delete_password) {
                    bcrypt.compare(req.body.c_password, user.password, function(err, equal) {
                        if(equal) {
                            db.deleteMany (Comment, {author: user.username}, function (result) {
                                db.deleteOne(User, {username: user.username}, function(flag) {
                                    if(flag) {
                                        req.session.destroy(function(err) {
                                            if(err) throw err;
                                            res.redirect('/');
                                        });
                                    }
                                });
                            }) 
                        }
                        else {
                        var details = {delete_passwordError : 'Incorrect password. Please try again.'}
                        db.findOne (User, {username : req.session.username}, '', function (user) {
                             db.findMany (Comment, {author : req.session.username}, '', function (comments) { 
                                details.user = user;
                                details.username = user.username;
                                details.comments = comments;
                                res.render ('profile', details);
                            });
                        });
                   
                        }
                    });
                }
                else {
                    var details = {delete_passwordError : 'Incorrect password. Please try again.'}
                    db.findOne (User, {username : req.session.username}, '', function (user) {
                         db.findMany (Comment, {author : req.session.username}, '', function (comments) { 
                            details.user = user;
                            details.username = user.username;
                            details.comments = comments;
                            res.render ('profile', details);
                        });
                    }); 
                }
            });
        }        
    }
}

module.exports = controller;