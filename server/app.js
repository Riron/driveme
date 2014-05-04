// Define server
var express = require('express'),
  http = require('http');

var app = module.exports = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy')
var server = require('http').createServer(app);

// MySQL
var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'driveme'
});

db.connect();

<<<<<<< HEAD
// define setting for 256 bit token key (base64 encoding)
var key = 'T=y:nL9el!_Fm1HV|1`-]o*^[,-odsG[<T.W41@=|Aq:l,Z.MII|*VA5$V&g5vvi'
app.set('token key', process.env.DASHES_TOKEN_KEY || key)

// define setting for max age of token
app.set('token age', process.env.DASHES_TOKEN_AGE || 60*60*1000)

=======
app.use(busboy());
>>>>>>> PICTURE-UPLOAD.DEV
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// Create a token generator with the default settings:
var token = require('./modules/token')(app, db);

// load routes
var router = require('./modules/routes')(express, db, app);
// all of our routes will be prefixed with /api/v1
app.use('/api/v1', router);

// load sockets module
require('./modules/socket')(server, db);

// load notifications module
require('./modules/notifications.js');

// Every minute, check for finished trips
setInterval(function () {
	// Check trip time. If < NOW, swotch to finish
	db.query('SELECT * FROM trip WHERE time < NOW() AND finished = 0', function (err, rows) {
		if(err) {
			res.send(err);
			throw err;
		}
		rows.forEach(function (row) {
			db.query('UPDATE trip SET finished = 1 WHERE id =' + row.id, function (err, row) {
				console.log('A trip has been set to finished')
			})
		});
	})
}, 3600);

// Listen on port 8080
server.listen(8080);

