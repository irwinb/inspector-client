/*
	Triggers a 'ready' event once the project has been loaded and connected.
*/
define([
	'backbone',
	'underscore',
	'client',
	'models/project',
	'models/operation',
	'collections/operations'
], function(Backbone, _, Client, Project, Operation, Operations) {
	'use strict';
	var Feed = {};
	_.extend(Feed, Backbone.Events);
	Feed.errorStarting = function (error) {
		Feed.trigger('error', error);
	};

	var parts = document.URL.split("/");
	var id = parts.pop();
	Feed.project = new Project({
		id: id
	});

	Feed.project.fetch()
		.done(function (data) {
			Feed.operations = new Operations();
			var initOpers = Feed.project.get('endpoint').operations;
			for (var i = 0; i < initOpers.length; i++) {
				var op = new Operation(initOpers[i]);
				if (op.get('response') !== undefined) {
					op.set('completed', true);
				}
				Feed.operations.add(op);
			}
			Feed.start();
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			Feed.errorStarting(errorThrown);
		});
	
	Feed.start = function() {
		Feed.trigger('ready');
		Client.connect(Feed.project, Feed.operations);
	};

	return Feed;
});