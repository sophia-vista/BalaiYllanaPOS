var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
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