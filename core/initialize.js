module.exports = (function(app, server) {
	
		// register routes and handlers
	require("./router")(app);
	require("./template")(app);

	var io = require('socket.io').listen(server);

	io.on('connection', function(socket) {
		console.log('user connected');

		socket.on('chat message', function(message) {
			console.log('message -> ' + message);
			io.emit('chat message', message);
		});

		socket.on('disconnect', function() {
			console.log("user disconnected");
		});
	});

	return app;

});