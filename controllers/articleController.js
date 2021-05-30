const db = require('../models/db.js');
const Article = require('../models/ArticleModel.js');
const Poll = require('../models/PollModel.js');

const articleController = {
    getArticleList: function (req, res) {
        res.render('article-list');
    },

    getArticlePost: function (req, res) {
        var doc = {
            title: "From the Past 'till Now: The Anti-Filipino Sentiment"
        }

        db.findOne(Article, doc, '', function(article){
            db.findOne(Poll, doc, '', function(poll){
                res.render('article-post', {article:article, poll:poll});
            });
        });

        
    }
}

module.exports = articleController;