const mongoose = require('mongoose');
const Article = require('../models/ArticleModel.js');
const Poll = require('../models/PollModel.js');

const url = 'mongodb+srv://admin1:admin@cluster0.barb2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) console.log (error);
            console.log('Connected!');
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },


    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        }).lean();
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        }).lean();
    },

    findManyReqs : function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        }).sort ({deadline: 1}).lean();
    },

    updateOne: function(model, filter, update, callback) {
        model.findOneAndUpdate(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(result);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(result);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(result.deletedCount);
        });
    },

    count : function (model, query, callback) {
        model.countDocuments (query, function (error, result) {
            if(error) return callback(false);
            console.log('Documents: ' + result);
            return callback(result);
        });
    },

    findRecent: function(model, callback) {
        model.find({}, '', {sort: {"_id": -1}, limit: 3}, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        }).lean();
    },

    votePoll: function(model, filter, change, callback) {
        model.findOneAndUpdate(filter, {$inc : change}, {new: true}, function(error, result) { 
            if(error) return callback(false);
            return callback(result);
        });
    },
}

module.exports = database;