var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    article: {
        type: String,
        required: true
    },
    
    author : {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);