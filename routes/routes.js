const express = require('express');

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');
const articleController = require('../controllers/articleController.js');
const quizController = require('../controllers/quizController.js');

const validation = require('../helpers/validation.js');

const app = express();

// index + etc
app.get('/', controller.getIndex);
app.get('/about-us', controller.getAboutUs);
app.get('/search', controller.getSearch);
app.get('/profile', controller.getProfile);
app.post('/editprofile', controller.postEditProfile);
app.post('/delprofile', controller.postDelProfile);

// // login + signup
app.get('/login', loginController.getLogin);
app.post('/login', validation.loginValidation(), loginController.postLogin);
app.get('/logout', logoutController.getLogout);
app.get('/signup', signupController.getSignUp);
app.post('/signup', validation.signupValidation(), signupController.postSignUp);

// validation
app.get('/getCheckUsername', controller.getCheckNewUsername);
app.get('/getCheckEmail', controller.getCheckNewUsername);

// articles
app.get('/article/list', articleController.getArticleList);
app.get('/article/:title', articleController.getArticlePost);
app.get('/article/poll/yes', articleController.incrementYesPoll);
app.get('/article/poll/no', articleController.incrementNoPoll);
app.get('/checkPollAnswered', articleController.checkPollAnswered);
app.post('/article/:title/addcomment', articleController.addComment);
app.post('/article/:title/deletecomment', articleController.deleteComment);

// quizzes
app.get('/quiz/list', quizController.getQuizList);
app.get('/quiz/:title', quizController.getQuizPost);
app.get('/quiz/:title/checkAnswer', quizController.checkAnswer);


module.exports = app;