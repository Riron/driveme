module.exports = function (express, db, app) {
	var router = express.Router();

	// middleware to use for all requests
	router.use(function (req, res, next) {
		// do logging
		console.log('Something is happening.');
		// If method type is OPTIONS, return OK
		res.set({'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Access-Token'})
		if(req.url != '/login') { app.validate(req, res, next); }
		if(req.method == 'options') {
			res.json({ options: 'OK' });
		}
		else {
			next(); // make sure we go to the next routes and don't stop here
		}
	});

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
			var query = 'INSERT INTO trip VALUES("", 1, "'+ req.body.seats + '","' + req.body.direction + '","' + req.body.time + '", 0)';
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'Trip created!' });
			});
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
				var token = app.generateToken(rows[0].id);
				console.log(token);
				res.json({token: token})
			}
			else{
				res.json({error:'KO'});
			}
		});
	});

	router.route('/trips/:trip_id')
		.get(function (req, res) {
			db.query('SELECT * FROM trip WHERE id=' + req.params.trip_id, function(err, rows) {
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
			db.query('DELETE FROM trip WHERE id=' + req.params.trip_id, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json({ message: 'Trip deleted!' });
			});
		});

	router.route('/users')
		.get(function (req, res) {
			db.query('SELECT * FROM users', function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		})
		.post(function (req, res) {
			var query = 'INSERT INTO user VALUES("", )';
			db.query(query, function(err, rows) {
				if(err) {
					res.send(err);
					throw err;
				}
				res.json(rows);
			});
		});

	router.route('/users/:user_id')
		.get(function (req, res) {
		})
		.put(function (req, res) {
		})
		.delete(function (req, res) {
		});

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