const db = require('../models/db.js');
const Quiz = require('../models/QuizModel.js');

const quizController = {
    getQuizList: function (req, res) {
        db.findMany(Quiz, {}, '', function(quizzes){
            res.render('quiz-list', {quizzes : quizzes, username: req.session.username});
        });
    },

    getQuizPost: function (req, res) {
        var doc = {title: req.params.title}
        var details = {};

        db.findOne(Quiz, doc, '', function(quiz){
            details.quiz = quiz;
            details.username = req.session.username;

            res.render('quiz-post', details);
        });
    },

    checkAnswer: function(req, res) {
        var doc = {title: req.params.title}
        db.findOne(Quiz, doc, '', function (quiz) {
            if (req.query.answer == quiz.answers[req.query.index-1].toString()) 
                res.send(true);
            else res.send(false)
        });
    }
}

module.exports = quizController;