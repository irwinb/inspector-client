define([
	'backbone',
	'collections/operations'
], function(Backbone, Operations) {
	'use strict';

	var Project = Backbone.Model.extend({
		defaults: {
			"id": -1,
			"target_endpoint": "[NULL]",
			"name":"[NULL]",
			"operations": new Operations()
		}
	});

	return Project;
});