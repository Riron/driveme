module.exports = function (express, db) {
	var router = express.Router();

	// middleware to use for all requests
	router.use(function (req, res, next) {
		// do logging
		console.log('Something is happening.');
		// If method type is OPTIONS, return OK
		res.set({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Access-Token'})
		if(req.method == 'options') {
			res.json({ options: 'OK' });
		}
		else {
			next(); // make sure we go to the next routes and don't stop here
		}
	});

	// Trips
	router.route('/trips')
		.get(function (req, res) {
			db.query('SELECT * FROM trip', function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		})
		.post(function (req, res) {
			var query = 'INSERT INTO trip VALUES("", ' + req.body.user_id + ', "'+ req.body.seats + '","' + req.body.direction + '","' + req.body.time + '", 0)';
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'Trip created!' });
			});
		});

	// Single trip
	router.route('/trips/:trip_id')
		.get(function (req, res) {
			db.query('SELECT trip.id AS id, seats, direction, time, finished, username, car, musicType, promo, room, picture FROM trip LEFT JOIN user ON trip.user_id = user.id WHERE trip.id=' + req.params.trip_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		})
		.put(function (req, res) {
			var query = 'UPDATE trip SET seats = ' + req.body.seats + ', direction = ' + req.body.direction + ', time = ' + req.body.time + ', finished = 0 WHERE id=' + req.params.trip_id;
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'Trip updated!' });
			});
		})
		.delete(function (req, res) {
			db.query('DELETE FROM trip WHERE id =' + req.params.trip_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'Trip deleted!' });
			});
		});

	// Users
	router.route('/users')
		.get(function (req, res) {
			db.query('SELECT * FROM user', function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		})
		.post(function (req, res) {
			var query = 'INSERT INTO user VALUES("", "' + req.body.username + '", "' + req.body.password + '", "' + req.body.email + '", "' + req.body.car + '", "' + req.body.musicType + '", "' + req.body.promo + '", "' + req.body.room + '", "' + req.body.picture + '")';
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'User created!' });
			});
		});

	// Single user
	router.route('/users/:user_id')
		.get(function (req, res) {
			db.query('SELECT * FROM user WHERE id =' + req.params.user_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		})
		.put(function (req, res) {
			var query = 'UPDATE user SET musicType = ' + req.body.musicType + ' WHERE id =' + req.params.user_id;
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'User updated!' });
			});
		})
		.delete(function (req, res) {
			db.query('DELETE FROM user WHERE id =' + req.params.user_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'User deleted!' });
			});
		});

	// Single users's tags
	router.route('/users/:user_id/tags')
		.get(function (req, res) {
		})
		.put(function (req, res) {
		});

	router.route('/tags')
		.get(function (req, res) {
		})
		.post(function (req, res) {
		});

	return router;
}