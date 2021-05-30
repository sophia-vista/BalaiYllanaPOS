var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    question : {
        type: String,
        required: true
    },

    yesctr: {
        type: Number,
        required: false
    },

    noctr: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Poll', PollSchema);