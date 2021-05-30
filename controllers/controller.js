const db = require('../models/db.js');
const Article = require('../models/ArticleModel.js');

const controller = {
    getIndex: function (req, res) {

        db.findMany(Article, {}, '', function(articles){
            var details = {articles : articles}
            res.render('index', details);
        });
        
    },

    getAboutUs: function (req, res) {
        res.render('about-us');
    }
}

module.exports = controller;