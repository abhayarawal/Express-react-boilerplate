var express = require('express');

// create an expree app
var app = express();
var port = process.env.PORT || 8000;

// create server
var server = app.listen(port, function() {
	console.log('Express server running on port ' + port);
});

// initialize the application
require('./core/initialize')(app, server);

// set the public folder
app.use(express.static('public'));