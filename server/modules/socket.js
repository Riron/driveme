var io = require('socket.io');

// Store trips in a var for now
var trips = [];

module.exports = function(server, db) {
	var refreshTrips = function () {
		db.query('SELECT trip.id AS id, user.id AS user_id, seats, direction, time, finished, username, picture FROM trip LEFT JOIN user ON trip.user_id = user.id WHERE trip.finished = 0', function(err, rows) {
		  // connected! (unless `err` is set)
		  if(err) {
	  		console.log('Error : ' + err);
	  		throw err;
		  }
		  rows.forEach(function (row) {
		  	db.query('SELECT user_id FROM user_trip WHERE trip_id = ' + row.id, function (sub_err, sub_rows) {
		  		var ids = [];
		  		sub_rows.forEach(function (sub_row) {
		  			ids.push(sub_row.user_id)
		  		})
		  		row.participants = ids;
		  	})
		  });
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
				setTimeout(refreshTrips(),1000);
				socket.broadcast.emit('update', trips);
			})
	});
}