var Redis = require('ioredis'),
		SocketIO = require('socket.io'),
		_ = require('underscore');

module.exports = (function(app, server) {

	// create the io and redis instances
	var io = SocketIO.listen(server);
			// redis = new Redis();

	// prototype store; replace with redis datastore (what about the socket???)
	var hash = [];

	// establish socket connection
	io.on('connection', function(socket) {

		// push the store to hash
		var store = {
			$id: socket.id,
			$sid: Math.random().toString(36).substr(2,4),
			socket: socket
		};
		hash.push(store);


		// events
		socket.emit('node:handshake', {$id: store.$id, $sid: store.$sid});

		socket.on('node:connect', function(params) {
			var target = null, reqNode = null;

			hash.forEach(function (obj, idx) {
				if (target !== null && reqNode !== null) { return; }

				if (obj.$id === params.$id) { reqNode = idx; }
				if (obj.$sid === params.location) { target = idx; }
			});

			if (target !== null && reqNode !== null) {
				hash[reqNode].$sid = hash[target].$sid;
				hash[reqNode].socket.emit('node:connect:confirm', {$sid: hash[reqNode].$sid});
			}
		});

	});


});