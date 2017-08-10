'use strict';

var browserify = require('express-browserify');
var express = require('express');
var getModels = require('./lib/server/getModels');
var http = require('http');
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket(server);

io.on('connection', function (socket) {
  console.log('a user connected');
  getModels({ socket: socket, db: null });
});

app.use(express.static(__dirname + '/public'));
app.get('/client.js', browserify('./client.js'));

server.listen(8080, function () {
  console.log('listening on :8080...');
});