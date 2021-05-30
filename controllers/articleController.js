const db = require('../models/db.js');
const Article = require('../models/ArticleModel.js');
const Poll = require('../models/PollModel.js');

const articleController = {
    getArticleList: function (req, res) {
        db.findMany(Article, {}, '', function(articles){
            res.render('article-list', {articles : articles});
        });
    },

    getArticlePost: function (req, res) {
        var doc = {title: req.params.title}
        console.log(doc)

        db.findOne(Article, doc, '', function(article){
            db.findOne(Poll, doc, '', function(poll){
                res.render('article-post', {article:article, poll:poll});
            });
        });
    }
}

module.exports = articleController;