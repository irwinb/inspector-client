/**
	Events:
	'operation'
*/
define([
	'backbone',
	'underscore',
	'socketio',
	'collections/operations',
	'models/operation'
], function(Backbone, _, io, Operations, Operation) {
	'use strict';

	var Client = {};
	_.extend(Client, Backbone.Events);

	var socket = null;

	Client.connect = function(project) {
		Client.project = project;
		socket = io.connect();

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnectRetry);
		socket.on('message', onMessage);
	};

	var onConnect = function() {
		console.log("Connected to server.");
		Client.joinProject(Client.project);
	};
	var onDisconnectRetry = function() {
		// Retry logic?!
		console.log("Disconnected from server.");
	};
	var onDisconnect = function() {
		
	};

	var onMessage = function(data) {
		try {
			var operation = JSON.parse(data);
			addOperation(operation);
		} catch (e) {
			console.log("Couldn't add message because " + e.toString());
		}
	}

	var addOperation = function(operation) {
		var operations = Client.project.get('operations');
		var oldOperation = operations.get(
			operation.id);
		if (oldOperation !== undefined) {
			oldOperation.set(operation);
			oldOperation.set('completed', true);
		} else {
			operations.add(new Operation(operation));
		}
	}

	Client.joinProject = function(project) {
		socket.send(JSON.stringify({
			action: 'set_project',
			project: project
		}));
	};

	return Client;
})