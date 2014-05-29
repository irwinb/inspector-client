// The server notifies clients of messages occurring on particular projects.
var projectToSockets = {};
var socketToProject = {};

exports.handler = function (socket) {
	var project = "";
	console.log("New client.");
	
	socket.on('message', function(data, flags) {
		try {
			var jsonData = JSON.parse(data);
			if (jsonData.project === undefined) {
				console.log("Invalid message from a socket.  Dropping.");
				socket.disconnect();
				return;
			}

			parseInitMessage(socket, jsonData);
		} catch (e) {
			console.log("Invalid message from a socket.  Dropping." + e.toString());
			socket.disconnect();
		}
	});
};

function isString(data) {
	return Object.prototype.toString.call(data) == '[object String]';
}

// Possible actions:
// set_project: set the current project.
function parseInitMessage(socket, msg) {
	if (msg.action == 'set_project' && isValidProject(msg.project)) {
		addClient(socket, msg.project.id);
		return;
	}

	console.log("Invalid message from a socket: " + JSON.stringify(msg));
}

function isValidProject(project) {
	return project !== undefined && project.id !== undefined && project.id > 0
}

// A message from backend.  Should also contain project info.
exports.newMessage = function(data) {
	var listeners = projectToSockets[data.project_id];
	if (typeof listeners === "undefined") {
		return;
	}
	
	var obj = JSON.stringify(data);
	for (var i = 0; i < listeners.length; i++) {
		var socket = listeners[i];
		socket.send(obj);
	}
}

function addClient(socket, projectId) {
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

	var listeners = projectToSockets[projectId];
	if (typeof listeners === "undefined") {
		listeners = new Array(socket);
		projectToSockets[projectId] = listeners;
	}

	socketToProject[socket] = projectId;
	listeners.push(socket);

	console.log("Client started listening to project " + projectId + ".");

	socket.on('disconnect', function() {
		console.log("Client for project " + projectId + " disconnected.");
		listeners.splice(listeners.indexOf(socket), 1);
	});
}