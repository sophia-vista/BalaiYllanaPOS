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

        db.findOne(Article, doc, '', function(result){
            db.findOne(Poll, doc, '', function(result){
                res.render('article-post', result);
            })
        })
    }
}

module.exports = articleController;