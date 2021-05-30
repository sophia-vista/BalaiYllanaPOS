var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    author : {
        type: String,
        required: true
    },

    questions: {
        type: [String],
        required: false
    },

    answers: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Quiz', QuizSchema);