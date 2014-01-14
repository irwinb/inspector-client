/**
	Events:
	'request'
	'response'
*/
define([
	'backbone',
	'underscore',
	'socketio',
	'collections/operations'
], function(Backbone, _, io, Operations) {
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
		Client.joinProject(Client.project.name);
	};
	var onDisconnectRetry = function() {
		// Retry logic?!
		console.log("Disconnected from server.");
	};
	var onDisconnect = function() {
		
	};

	var onMessage = function(data) {
		console.log("New message: " + data);
		try {
			var operation = JSON.parse(data);
			addOperation(operation);
		} catch (e) {
			console.log("Couldn't parse message:" + data);
		}
	}

	var addOperation = function(operation) {
		Client.project.operations.add(operation);
	}

	Client.joinProject = function(projName) {
		socket.send(JSON.stringify({
			project: {
				name: projName
			}}));
	};

	return Client;
})