'use strict';
var debug = require('debug')('my express app');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/svguitar', express.static(__dirname + "/node_modules/svguitar/dist"));
app.use('/public', express.static(__dirname + "/public"));
app.use('/bootstrap', express.static(__dirname + "/node_modules/bootstrap/dist"));
app.get("/", (res, req) => { req.sendFile(__dirname + "/chord.html") });

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
