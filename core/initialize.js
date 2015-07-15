module.exports = (function(app, server) {
	
		// register routes and handlers
	require("./router")(app);
	require("./template")(app);
	require("../app/reactors/initialize")(app, server);

	
	return app;

});