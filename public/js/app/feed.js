/*
	Triggers a 'ready' event once the project has been loaded and connected.
*/
define([
	'backbone',
	'underscore',
	'client',
	'models/project',
	'collections/operations'
], function(Backbone, _, Client, Project, Operations) {
	'use strict';
	var Feed = {};
	_.extend(Feed, Backbone.Events);
	
	Feed.start = function() {
		Feed.trigger('ready');
		Client.connect(Feed.currentProject);
	};
	Feed.errorStarting = function (error) {
		Feed.trigger('error', error);
	};

	var parts = document.URL.split("/");
	var id = parts.pop();
	Feed.currentProject = new Project({
		id: id
	});

	Feed.currentProject.fetch()
		.done(function (data) {
			Feed.start();
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			Feed.errorStarting(errorThrown);
		});

	return Feed;
});