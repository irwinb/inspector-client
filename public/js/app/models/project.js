define([
	'backbone'
], function(Backbone) {
	'use strict';
	
	var Project = Backbone.Model.extend({
		urlRoot: '/api/projects',
		defaults: {
			"id": -1,
			"last_updated" : "",
			"name":"[NULL]",
			"endpoint":{}
		}
	});

	return Project;
});