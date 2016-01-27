'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');

var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));
var storyApi = require('./api/story-api.js');
var Story = require('./dao/story-dao.js').Model(connPool);

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.use('/api/v1', storyApi.Router(Story));

app.listen(80, function () {
    console.log('server is listening...');
});