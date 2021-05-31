var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    intro: {
        type: String,
        required: true
    },

    questions: {
        type: [String],
        required: false
    },

    answers: {
        type: [Boolean],
        required: false
    },

    explanations: {
        type: [Boolean],
        required: false
    }
});

module.exports = mongoose.model('Quiz', QuizSchema);