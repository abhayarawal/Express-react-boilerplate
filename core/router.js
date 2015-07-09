var fs = require('fs');

module.exports = (function(app) {

	// handlers object
	handlers = {};

	// find and register all handlers
	fs.readdir('app/handlers', function(err, files) {
		files.forEach(function(file, idx) {
			
			var handler_name = file.replace(/\..+$/, '');
			var handler_object = require('../app/handlers/'+handler_name);

			for (var handler_action in handler_object)
			{
				var _tmp = handler_name.replace(/_handler/, '');
				handlers[_tmp+"#"+handler_action] = handler_object[handler_action];
			}
		});

		// require the routes
		require("../config/routes")(get);
	});

	// register get requests with express
	var get = function(uri, proc) {
		// note : run more validation
		
		if (proc in handlers)	{
			app.get(uri, handlers[proc])
		}
		else {
			throw new Error("Handler#action - " + proc + " not found");
		}
	}

	return app;

});