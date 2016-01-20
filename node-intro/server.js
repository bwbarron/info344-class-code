'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// log requests
app.use(morgan('dev'));
// parse JSON post bodies
app.use(bodyParser.json());

// serve static files from /static
app.use(express.static(__dirname + '/static'));

//app.get('/', function (req, res) {
//    res.setHeader('Content-Type', 'text/plain');
//    res.send('Hello World!');
//});
//app.get('/time', function (req, res) {
//    res.setHeader('Content-Type', 'text/plain');
//    res.send(new Date());
//});

app.get('/api/v1/users', function (req, res) {
    var users = [{
        email: 'test@test.com',
        displayName: 'Test User'
    }];
    res.json(users);
});


app.post('/api/v1/users', function (req, res) {
    console.log(req.body);
    res.json({message: 'new user created'});
});


app.listen(80, function () {
    console.log('server is listening');
});