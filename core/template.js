var haml = require('jade');

module.exports = (function(app) {

	// set jade as the templating engine
	app.set('views', "app/views");
	app.set('view engine', 'jade');
	
});