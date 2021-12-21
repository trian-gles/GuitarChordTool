'use strict';
var debug = require('debug')('my express app');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get("/", (res, req) => { req.sendFile(__dirname + "/index.html") })

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
