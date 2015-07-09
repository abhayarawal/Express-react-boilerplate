var express = require('express'),
		haml = require('hamljs');

// create an expree app
var app = express();
var port = process.env.PORT || 8000;

// initialize the application
require('./core/initiate')(app);

// set haml as the templating engine
app.engine('.haml', require('hamljs').renderFile);

// create server
var server = app.listen(port, function() {
	console.log('Express server running on port ' + port);
});