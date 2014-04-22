var express = require('express'),
  http = require('http');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var notification = require('./notifications/notifications.js');

// Store trips in a var for now
var trips = [
	{name: 'Orion', seats: '4', direction: 'Lahiure', time: '13h45'},
	{name: 'JB Buzz', seats: '3', direction: 'Bourseul', time: '14h00'}
];

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('A new user is there, nice ;)');
    socket.emit('init', trips);
});


server.listen(8080);