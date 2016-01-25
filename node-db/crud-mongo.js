'use strict';

var mongoose = require('mongoose');
var dbConfig = require('./secret/config-mongo.json');

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function (err) {
    console.error(err);
});

var storySchema = new mongoose.Schema({
    url: String,
    votes: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var Story = mongoose.model('Story', storySchema);
var newStory = {
    url: 'http://www.google.com'
};
var id;

Story.create(newStory)
    .then(function (story) {
        id = story._id;
        console.log('inserted new story');
        console.log(story);
    })
    .then(function () {
        return Story.findById(id).exec();
    })
    .then(function (story) {
        console.log('found story');
        console.log(story);
        return Story.findByIdAndUpdate(id, {$inc: {votes: 1}}, {new: true});
    })
    .then(function (story) {
        console.log('updated story');
        console.log(story);
        return Story.findByIdAndRemove(id);
    })
    .then(function () {
        console.log('story deleted');
    })
    .then(null, function (err) { // equivalent to .catch() (mongoose lib doesn't support .catch)
        console.error(err);
    })
    .then(function () {
        mongoose.connection.close();
    });