var fs = require('fs'),
		path = require('path')
		walk = require('walk');

module.exports = (function (app) {

	// handlers object
	var handlers = {};
	var walker = walk.walk("app/handlers", {});

	walker.on("file", function (root, stat, next) {

		var handler_name = stat.name.replace(/\..+$/, ''),
				handler_object = require(path.join('..', root, handler_name)),
				tmp;


		Object.keys(handler_object).forEach(function (handler_action) {

			tmp = handler_name.replace(/_handler/, '');
			handlers[tmp+"#"+handler_action] = handler_object[handler_action];

		});

		next();
	});

	walker.on("end", function() {
		require("../config/routes")(get);
	});
	

	// register get requests with express
	var get = function (uri, block) {

		if (arguments.length < 2) {
			throw new Error("Get function requires two arguments. Given " + arguments.length);
			return;
		}

		if (block in handlers)	{
			app.get(uri, function (req, res){

				// render data to be sent to the view
				render_data = handlers[block](req, res) || {};

				// only render views if response headers are not sent
				if (!res.headersSent) {
					hbs_template = block.replace("#", "/");

					// override the jade template if render is returned
					if ("render" in render_data) {
						hbs_template = render_data['render'];
					}

					// use the naming convention to find and render the template
					res.render(hbs_template, render_data);
				}

			});
		}
		else {
			throw new Error("Handler#action - " + block + " not found");
		}
	}

	var post = function (uri, block) {

		if (block in handlers) {
			app.post(uri, function (req, res) {

			});
		}
		else
		{
			
		}
	}

	return app;

});