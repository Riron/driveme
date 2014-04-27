var io = require('socket.io');

// Store trips in a var for now
var trips = [];

module.exports = function(server, db) {
	var refreshTrips = function () {
		db.query('SELECT trip.id AS id, seats, direction, time, finished, username, picture FROM trip LEFT JOIN user ON trip.user_id = user.id', function(err, rows) {
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

	// Socket handling
	io.sockets.on('connection', function (socket) {
	    console.log('A new user is there, welcome !');

	    socket.on('get trips', function (data) {
			  socket.emit('update', trips);
			});

			socket.on('participant change', function (data) {
			  socket.broadcast.emit('update participants', data);
			});

			socket.on('trip added', function () {
				refreshTrips();
				socket.broadcast.emit('update', trips);
			})
	});
}