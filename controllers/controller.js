const db = require('../models/db.js');
const Article = require('../models/ArticleModel.js');
const Quiz = require('../models/QuizModel.js');

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
    }
}

module.exports = controller;