var fs = require('fs');

module.exports = (function (app) {

	// handlers object
	var handlers = {};

	// find and register all handlers
	fs.readdir('app/handlers', function (err, files) {
		files.forEach(function (file, idx) {

			var handler_name = file.replace(/\..+$/, ''),
					handler_object = require('../app/handlers/'+handler_name),
					tmp;

			Object.keys(handler_object).forEach(function (handler_action) {

				tmp = handler_name.replace(/_handler/, '');
				handlers[tmp+"#"+handler_action] = handler_object[handler_action];

			});
		});


		// require the routes
		require("../config/routes")(get);

	
	});

	// register get requests with express
	var get = function (uri, proc) {
		// note : run more validation
		
		if (proc in handlers)	{
			app.get(uri, function (req, res){
				// render data to be sent to the view
				render_data = handlers[proc](req, res) || {};
				hbs_template = proc.replace("#", "/");

				// override the jade template if render is returned
				if ("render" in render_data) {
					hbs_template = render_data['render'];
				}

				// use the naming convention to find and render the template
				res.render(hbs_template, render_data);
			});
		}
		else {
			throw new Error("Handler#action - " + proc + " not found");
		}
	}

	return app;

});