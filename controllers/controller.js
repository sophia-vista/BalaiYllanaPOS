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
    }
}

module.exports = controller;