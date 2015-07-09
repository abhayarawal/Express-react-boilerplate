module.exports = (function(app) {

	// register routes and handlers
	require("./router")(app);

	return app;

});