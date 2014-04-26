var io = require('socket.io');

// Store trips in a var for now
var trips = [
	{name: 'Orion', seats: '4', direction: 'Lahiure', time: '13h45'},
	{name: 'JB Buzz', seats: '3', direction: 'Bourseul', time: '14h00'}
];

module.exports = function(server, db) {
	var refreshTrips = function () {
		db.query('SELECT * FROM trip LEFT JOIN user ON trip.user_id = user.id', function(err, rows) {
		  // connected! (unless `err` is set)
		  if(err) {
	  		console.log('Error : ' + err);
	  		throw err;
		  }
		  // Reset trips
		  trips = rows;
		});
	};

	io = io.listen(server);
	refreshTrips();

	io.sockets.on('refresh', function (socket) {
		refreshTrips();
	  socket.broadcast.emit('trip change', trips);
	});

	// Quand on client se connecte, on le note dans la console
	io.sockets.on('connection', function (socket) {
	    console.log('A new user is there, nice ;)');
	    console.log(trips);
	    socket.emit('init', trips);
	});
}