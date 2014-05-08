module.exports = function (express, db, app) {
	var fs = require('fs');
	var router = express.Router();

	// middleware to use for all requests
	router.use(function (req, res, next) {
		// do logging
		console.log('Something is happening.');
		// If method type is OPTIONS, return OK
		res.set({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS', 'Access-Control-Expose-Headers': 'X-Access-Token', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Access-Token'})
		if(req.method == 'OPTIONS') {
			res.send();
		}
		else {
			if(req.url !== '/login') { app.validate(req, res, next); }
			else { next(); } // make sure we go to the next routes and don't stop here
		}
	});

	// Trips
	router.route('/trips')
		.get(function (req, res) {
			db.query('SELECT * FROM trip WHERE finished = 0', function(err, rows) {
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

	router.route('/loginWithToken')
		.post(function (req, res) {
			res.json({succes :"ok"});
		});

	router.route('/login')
		.post(function (req, res) {

			console.log('log start');
			var query = 'SELECT id FROM user WHERE username ='+ db.escape(req.body.login) +' and password = '+ db.escape(req.body.password);
			console.log(query);
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				else if(rows.length === 1){
					var token = app.generateToken(rows[0].id, Date.now()+app.get('token age'));
					console.log(token);
					res.json({token: token})
				}
				else{
					res.json({error:'KO'});
				}
			});
		});

	// Single trip
	router.route('/trips/:trip_id')
		.get(function (req, res) {
			db.query('SELECT trip.id AS id, user.id AS user_id, seats, direction, time, finished, username, car, musicType, promo, room, picture FROM trip LEFT JOIN user ON trip.user_id = user.id WHERE trip.id=' + req.params.trip_id, function(err, rows) {
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

	// Users associated with a trip (not driver)
	router.route('/trips/:trip_id/users')
		.get(function (req, res) {
			db.query('SELECT user.username AS username, user.id AS id, user.picture AS picture FROM user_trip LEFT JOIN user ON user_trip.user_id = user.id WHERE user_trip.trip_id =' + req.params.trip_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		})
		.post(function (req, res) {
			var query = 'INSERT INTO user_trip VALUES("", ' + req.body.user_id + ', "'+ req.body.trip_id + '")';
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'User added to trip!' });
			});
		})
		.delete(function (req, res) {
			var query = 'DELETE FROM user_trip WHERE user_id = ' + req.query.user_id  + ' AND trip_id = ' + req.query.trip_id;
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'User deleted from trip!' });
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
			var query = 'UPDATE user SET picture = "' + req.body.picture + '", promo = "' + req.body.promo + '", room = "' + req.body.room + '", phone = "' + req.body.phone + '", car = "' + req.body.car + '", musicType = "' + req.body.musicType + '" WHERE id =' + req.params.user_id;
			console.log(query);
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

	router.route('/news')
		.get(function (req, res) {
			db.query('SELECT id, title, date, picture FROM news LIMIT 10', function(err, rows) {
				if(err) {
					console.log('error in news')
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		});

	router.route('/news/:news_id')
		.get(function (req, res) {
			db.query('SELECT * FROM news WHERE id =' + req.params.news_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		});

	router.route('/upload')
		.post(function (req, res) {
			var fstream;
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	        console.log("Uploading: " + filename); 
	        fstream = fs.createWriteStream('./uploads/' + filename);
	        file.pipe(fstream);
	        fstream.on('close', function () {
	            res.send('File uploaded : ' + filename);
	            console.log('File uploaded : ' + filename);
	            var id = filename.split('-');
	            var id = id[id.length-1];
	            db.query('UPDATE user SET picture = "http://rlier.fr/orion/driveme/uploads/' + filename + '"  WHERE id =' + id, function(err, rows) {
								if(err) {
									res.send(err);
									throw err;
								}
								res.json(rows);
							});
	        });
	    });
		});

	return router;
}