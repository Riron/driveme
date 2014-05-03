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

app.use(busboy());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

// load routes
var router = require('./modules/routes')(express, db);
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