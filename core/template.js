var handlebars = require('express-handlebars'),
		path = require("path");

module.exports = (function(app) {

	// path to the views directory
	_views_dir = path.join(process.cwd(), "app", "views");

	// set the views directory
	// Note: ignored by express-handlebars
	app.set('views', _views_dir);

	// provide default settins for handlebars
	app.engine('hbs', handlebars({
		defaultLayout: 'layout', 
		extname: 'hbs', 

		// need to explicitly define the layouts folder
		layoutsDir: path.join(_views_dir, "/layouts"),

		// define the partials folder
		partialsDir: path.join(_views_dir, "/partials")
	}));

	// set the view engine
	app.set('view engine', 'hbs');
	
});