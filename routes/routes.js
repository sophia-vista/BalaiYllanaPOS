const express = require('express');

const controller = require('../controllers/controller.js');
// const signupController = require('../controllers/signupController.js');
// const loginController = require('../controllers/loginController.js');
// const logoutController = require('../controllers/logoutController.js');
// const homeController = require('../controllers/homeController.js');
// const profileController = require('../controllers/profileController.js');
// const userController = require('../controllers/userController.js');
// const successController = require('../controllers/successController.js');
// const errorController = require('../controllers/errorController.js');

const validation = require('../helpers/validation.js');

const app = express();

// index
app.get('/', controller.getIndex);
// app.get('/about-us', controller.getAboutUs);

// // login + register
// app.get('/login', loginController.getLogin);
// app.post('/login', loginController.postLogin);
// app.get('/logout', logoutController.getLogout);
// app.get('/register', signupController.getSignUp);
// app.post('/register', validation.signUpValidation(), signupController.postSignUp);
// app.get('/register-success', successController.getSuccessReg);
// app.get('/getCheckUsername', signupController.getCheckUsername);
// app.get('/getCheckEmail', signupController.getCheckEmail);

// // home
// app.get('/home', homeController.getHome);
// app.get('/getReqsDates', homeController.getReqsDates);

// //search
// app.get('/search', controller.getSearch);

// // profile
// app.get('/profile', profileController.getYourProfile);
// app.get('/profile/edit', profileController.getEditProfile);
// app.post('/profile/edit', validation.editProfile(), profileController.postEditProfile);
// app.post('/profile/edit/prof-picture', upload.single('prof-picture'), profileController.postEditProfilePic);
// app.get('/profile/delete', profileController.getDelProfile);
// app.post('/profile/delete', profileController.postDelProfile);
// app.get('/profile-deletion-success', successController.getSuccessDel);
// app.get('/getCheckNewUsername', profileController.getCheckNewUsername);

// // view other users
// app.get('/:username/profile', userController.getUserProfile);
// app.get('/:username/schedule', userController.getUserSchedule);

// // error pages
// app.get('/error/401', errorController.get401);
// app.get('/error/403', errorController.get403);
// app.get('/error/404', errorController.get404);

module.exports = app;