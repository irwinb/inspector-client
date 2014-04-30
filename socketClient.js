var socketServer = require('./socketServer')

var client = {};
exports.Start = function(WebSocket, server) {
	console.log("[Feeder] Connecting to feeder.");
	client.socket = new WebSocket('ws://localhost:8000/feeder');

	client.socket.on('open', function() {
		console.log("[Feeder] Connected to feeder.");
	});
	client.socket.on('close', function() {
		console.log("[Feeder] Disconnected from feeder.");
	});

	client.socket.on('error', function(e) {
		console.log("[Feeder] Error: " + e);
	});
	client.socket.on('message', function(message, flags) {
		try {
			var data = JSON.parse(message);
			socketServer.newMessage(data);
		} catch (e) {
			console.log("Invalid message [" + message + "] \n" + e);
		}
	});
};