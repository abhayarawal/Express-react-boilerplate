var Redis = require('ioredis'),
		SocketIO = require('socket.io'),
		_ = require('underscore'),
		moment = require('moment');

module.exports = (function(app, server) {

	// create the io and redis instances
	var io = SocketIO.listen(server);
			// redis = new Redis();

	// prototype store; replace with redis datastore (what about the socket???)
	var hash = [],
			sessions = {};

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
				_$sid = hash[target].$sid;

				hash[reqNode].$sid = _$sid;

				if (_$sid in sessions) {
					sessions[_$sid].$ids.push(reqNode);
				}
				else {
					sessions[_$sid] = {
						$ids: [target, reqNode],
						timestamp: moment()
					}
				}

				sessions[_$sid].$ids.forEach(function (id) {
					hash[id].socket.emit('node:connect:confirm', {$sid: hash[reqNode].$sid, timestamp: sessions[_$sid].timestamp});
				});
			}
		});

	});


});