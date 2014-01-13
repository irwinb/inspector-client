define([
	"backbone"
], function(Backbone) {
	'use strict';

	var Project = Backbone.Model.extend({
		defaults: {
			"id": -1,
			"target_endpoint": "[NULL]",
			"name":"[NULL]"
		}
	});

	return Project;
});