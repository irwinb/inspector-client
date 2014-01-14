// The server notifies clients of messages occurring on particular projects.
var projectToSockets = {};
var socketToProject = {};

exports.handler = function (socket) {
	var project = "";
	console.log("New client.");
	
	socket.on('message', function(data, flags) {
		console.log("[on:message]" + data);
		try {
			var jsonData = JSON.parse(data);
			if (jsonData.project === undefined) {
				console.log("Invalid message from a socket.  Dropping.");
				socket.disconnect();
				return;
			}
			if (Object.prototype.toString.call(jsonData.project.name) != '[object String]') {
				console.log("Invalid message from a socket.  Dropping.");
				socket.disconnect();
				return;
			}
			addClient(jsonData.project.name, socket);
		} catch (e) {
			console.log("Invalid message from a socket.  Dropping." + e.toString());
			socket.disconnect();
		}
	});
};

// Message should also contain project info.
exports.newMessage = function(data) {
	var listeners = projectToSockets[data.project.name];
	if (typeof listeners === "undefined") {
		return;
	}

	for (var i = 0; i < listeners.length; i++) {
		var socket = listeners[i];
		socket.send(JSON.stringify(data));
	}
}

function addClient(projectName, socket) {
	// A client can only listen to one project at a time.
	var oldProject = socketToProject[socket];
	if (typeof oldProject !== "undefined") {
		var listeners = projectToSockets[oldProject];
		for (var i = 0; i < listeners.length; i++) {
			if (socket == listeners[i]) {
				listeners.splice(i, 1);
				break;
			}
		}
	}

	var listeners = projectToSockets[projectName];
	if (typeof listeners === "undefined") {
		listeners = new Array(socket);
		projectToSockets[projectName] = listeners;
	}

	socketToProject[socket] = projectName;
	listeners.push(socket);

	console.log("Client started listening to project " + projectName + ".");

	socket.on('disconnect', function() {
		console.log("Client for project " + projectName + " disconnected.");
		listeners.splice(listeners.indexOf(socket), 1);
	});
}