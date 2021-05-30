var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    polls: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);