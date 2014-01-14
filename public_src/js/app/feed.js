/** @jsx React.DOM */
define([
	'backbone',
	'client'
], function(Backbone, Client) {
	'use strict';

	var currentProject = {
		name: "facebook_graph",
		connected: false,
		operations: new Operations()
	};
	
	var feed = {};
	feed.start = function() {
		Client.connect(currentProject);
	};

	feed.currentProject = currentProject;
	

	return feed;
});