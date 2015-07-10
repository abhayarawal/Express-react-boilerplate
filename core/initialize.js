module.exports = (function(app) {

	// register routes and handlers
	require("./router")(app);
	require("./template")(app);

	return app;

});