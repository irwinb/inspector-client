/** @jsx React.DOM */
define([
	'backbone',
	'client'
], function(Backbone, Client) {
	'use strict';
	
	var feed = {};
	feed.start = function() {
		Client.connect();
	};

	var currentProject = {
		name: "facebook_graph",
		connected: false,
		operations: new Operations()
	};

	feed.currentProject = currentProject;
	

	return feed;
});