var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    author : {
        type: String,
        required: true
    },

    intro : {
        type: String,
        required: true
    },

    content: {
        type: [String],
        required: false
    },

    references: {
        type: [String],
        required: false
    },

    imgpath: {
        type: String,
        required: false
    },

    imgsrc: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Article', ArticleSchema);