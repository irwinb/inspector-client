define([
	'backbone',
	'socketio'
], function(Backbone, io) {
	'use strict';
	
	var app = {};
	var currentProject = {
		name: "",
		connected: false,
		messages: new Array()
	};

	app.currentProject = currentProject;

	var socket = io.connect();

	socket.on('connect', onConnect);
	socket.on('disconnect', onDisconnectRetry);
	socket.on('message', onMessage);
	var onConnect = function() {
		console.log("Connected to server.");
	};
	var onDisconnectRetry = function() {
		// Retry logic?!
		console.log("Disconnected from server.");
	};
	var onDisconnect = function() {

	};

	var onMessage = function(data) {
		console.log("New message: " + data);
		addMessage(message);
	}

	var addMessage = function(message) {
		messages.push(message);
	}

	app.joinProject = function(projName) {
		socket.send(JSON.stringify({
			project: {
				name: projName
			}}));
	};

	return app;
});