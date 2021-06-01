const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Article = require('../models/ArticleModel.js');
const Poll = require('../models/PollModel.js');
const Comment = require('../models/CommentModel.js');

const articleController = {
    getArticleList: function (req, res) {
        db.findMany(Article, {}, '', function(articles){
            res.render('article-list', {articles : articles, username: req.session.username});
        });
    },

    getArticlePost: function (req, res) {
        var doc = {title: req.params.title}
        var details = {}
        db.findOne(Article, doc, '', function(article){
            db.findOne(Poll, doc, '', function(poll){
                db.findMany(Comment, doc, '', function(comments){
                    details.article = article;
                    details.poll = poll;
                    details.comments = comments;
                    details.username = req.session.username;

                    // calculates percentage of votes
                    var total = poll.yesctr + poll.noctr;
                    var yespercent = poll.yesctr / total * 100;
                    var nopercent = poll.noctr / total * 100;
                    details.polltotal = total;
                    details.yespercent = yespercent.toFixed(2);
                    details.nopercent = nopercent.toFixed(2);

                    if (!req.session.username)
                        details.notloggedin = 'Sign up or log in to answer the poll!';

                    db.findOne(User, {username: req.session.username}, '', function(user){
                        if (user && user.polls.includes(req.params.title))
                            details.answered = 'You have already answered this poll. Comment your thoughts down below!';
                        res.render('article-post', details);
                    });
                });
            });
        });
    },

    incrementYesPoll: function (req, res) {
        var doc = {title: req.query.title}
        db.updateOne(User, {username: req.session.username}, {$push: {polls: req.query.title}}, function(result){
            db.votePoll(Poll, doc, {'yesctr' : 1}, function(poll){
                db.findOne(Article, doc, '', function(article){
                    db.findOne(Poll, doc, '', function(poll){
                        res.render('article-post', {article:article, poll:poll}, function(err, html){
                            res.send(html);
                        });
                    });
                });
            });
        });
    },

    incrementNoPoll: function (req, res) {
        var doc = {title: req.query.title}
        db.updateOne(User, {username: req.session.username}, {$push: {polls: req.query.title}}, function(result){
            db.votePoll(Poll, doc, {'noctr' : 1}, function(poll){
                db.findOne(Article, doc, '', function(article){
                    db.findOne(Poll, doc, '', function(poll){
                        res.render('article-post', {article:article, poll:poll}, function(err, html){
                            res.send(html);
                        });
                    });
                });
            });
        });
    },

    checkPollAnswered: function(req, res) {
        db.findOne(User, {username: req.session.username}, '', function (user) {
            if (user && user.polls.includes(req.query.title))
                res.send(true);
            else res.send(false);
        });
    },

    addComment: function (req, res) {
        var comment = {
            title: req.params.title,
            author: req.session.username,
            content: req.body.comment
        }

        db.insertOne(Comment, comment, function (comment) {
            res.render('comment', {layout: false, data:comment}, function(err, html){
                res.send(html);
            });
        });
    },

    deleteComment: function (req, res) {
        var comment = {
            title: req.params.title,
            author: req.session.username,
            content: req.body.comment
        }

        db.deleteOne(Comment, comment, function (comment) {
            res.render('comment', {layout: false, data:comment}, function(err, html){
                res.send(html);
            });
        });
    },
}

module.exports = articleController;