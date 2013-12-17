/*
 * Serve content over a socket
 */

exports.server = function (socket) {
  socket.emit('send:name', {
    name: 'Bob'
  });

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);
};

var client = {}
client.Start = function(WebSocket) {
	console.log("[Feeder] Connecting to feeder.");
	client.socket = new WebSocket('ws://localhost:8080/feeder');

	client.socket.on('open', function() {
		console.log("[Feeder] Connected to feeder.");
	});
	client.socket.on('close', function() {
		console.log("[Feeder] Disconnected from feeder.");
	});

	client.socket.on('error', function(e) {
		console.log("[Feeder] Error: " + e);
	});
	client.socket.on('message', function(data, flags) {
		console.log("[Feeder] New message: " + data)
	});
}

exports.client = client;