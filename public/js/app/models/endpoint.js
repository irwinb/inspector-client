define([
	'backbone',
], function(Backbone) {
	'use strict';

	var Endpoint = Backbone.RelationalModel.extend({
		defaults: {
			"id": -1,
			"target": "[NULL]",
			"name":"[NULL]",
			"protocol": "[NULL]",
			"operations": new Array()
		}
	});

	return Endpoint;
});