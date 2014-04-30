define([
	'backbone',
	'client',
	'models/project',
	'collections/operations'
], function(Backbone, Client, Project, Operations) {
	'use strict';

	var currentProject = new Project({
		name: "facebook_graph",
		id: 1,
		operations: new Operations()
	});
	
	var feed = {};
	feed.start = function() {
		Client.connect(currentProject);
	};

	feed.currentProject = currentProject;
	
	feed.start();

	return feed;
});