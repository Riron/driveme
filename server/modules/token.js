var crypto = require('crypto');

module.exports = function (app, db) {
	var TOKEN_HEADER = 'X-Access-Token';
	var key = app.get('token key');
	var age = app.get('token age');
	// validate signed access token included in request header
	// TODO improve logging for fail2ban processing
	app.validate = function (req, res, next) {
		var token = req.get(TOKEN_HEADER);
		var contents;

		if (token) {
			console.log("l'age donné en plus au token est de %s", age);
			contents = token.split(':')
			if (contents.length !== 3) { return res.send(401) }
			var query = 'SELECT id FROM user WHERE id=' + contents[0];
			db.query(query, function(err, rows){
				if(err) {
					res.send(err);
					throw err;
				}
				else{
					if (rows.length !== 1) {
						console.log('token received with invalid user id: %s', contents[0])
						res.send(401)
					} else if (!validTimestamp(contents[1])) {
						console.log('token received with expired timestamp')
						res.send(401)
					} else if (!validSignature(contents)) {
						console.log('token received with invalid signature: %s', token)
						res.send(401)
					} else {
						res.set(TOKEN_HEADER, app.generateToken(contents[0],Date.now()+age));
						next();
					} 
				}
			})
		} else {
			console.log('token not received for %s', req.originalUrl)
			res.send(401)
		}

		function validTimestamp(timestamp) {
			return timestamp - Date.now() >= 0
		}

		function validSignature(contents) {
			return app.generateToken(contents[0],contents[1])  === contents.join(':')
		}
	}

	// generate signed access token with user id and timestamp
	app.generateToken = function (id, timestamp) {
		console.log('creation token, timestamp : %s et now :%s', timestamp, Date.now());
		var content = id + ':' + timestamp
		return content + ':' + crypto
		.createHmac('sha256', new Buffer(key, 'base64'))
		.update(content)
		.digest('base64')
	}

	return app;
};