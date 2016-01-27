'use strict';

var express = require('express');

// look in completed code for implementation with titles added

module.exports.Router = function (Story) {
    var router = express.Router();

    router.get('/stories', function (req, res, next) {
        // return all stories from db
        Story.getAll()
            .then(function (rows) {
                res.json(rows);
            })
            .catch(next); // handle errors
    });

    router.post('/story', function (req, res, next) {
        // insert new story into db and return data with default values applied
        Story.insert(req.body)
            .bind(this)
            .then(res.json)
            .catch(next);
    });

    router.post('/story/:id/votes', function (req, res, next) {
        // upvote the story and return the full story with current # of votes
        Story.upVote(req.params.id)
            .bind(this)
            .then(res.json)
            /*
            // without bind
            .then(function (row) {
                res.json(row);
            })
             */
            .catch(next);
    });

    return router;
};