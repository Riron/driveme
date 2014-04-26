// Define server
var express = require('express'),
  http = require('http');

var app = module.exports = express();
var bodyParser = require('body-parser');
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

// Listen on port 8080
server.listen(8080);