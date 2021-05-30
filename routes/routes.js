const express = require('express');

const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
// const logoutController = require('../controllers/logoutController.js');
const articleController = require('../controllers/articleController.js');
const quizController = require('../controllers/quizController.js');
// const profileController = require('../controllers/profileController.js');
// const errorController = require('../controllers/errorController.js');

//const validation = require('../helpers/validation.js');

const app = express();

// index
app.get('/', controller.getIndex);
app.get('/about-us', controller.getAboutUs);

// // login + signup
app.get('/login', loginController.getLogin);
app.post('/login', validation.loginValidation(), loginController.postLogin);
// app.get('/logout', logoutController.getLogout);
app.get('/signup', signupController.getSignUp);
app.post('/signup', validation.signupValidation(), signupController.postSignUp);
// app.get('/getCheckUsername', signupController.getCheckUsername);
// app.get('/getCheckEmail', signupController.getCheckEmail);

// articles
app.get('/article/list', articleController.getArticleList);
app.get('/article/:title', articleController.getArticlePost);

// quizzes
app.get('/quiz/list', quizController.getQuizList);

// //search
// app.get('/search', controller.getSearch);

// // profile
// app.get('/profile', profileController.getYourProfile);
// app.get('/profile/edit', profileController.getEditProfile);
// app.post('/profile/edit', validation.editProfile(), profileController.postEditProfile);
// app.post('/profile/edit/prof-picture', upload.single('prof-picture'), profileController.postEditProfilePic);
// app.get('/profile/delete', profileController.getDelProfile);
// app.post('/profile/delete', profileController.postDelProfile);
// app.get('/getCheckNewUsername', profileController.getCheckNewUsername);

// // error pages
// app.get('/error/404', errorController.get404);

module.exports = app;