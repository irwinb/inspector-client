define([
	'backbone',
	'models/request',
	'models/response'
], function(Backbone, Request, Response) {
	'use strict';

	var Operation = Backbone.Model.extend({
		defaults: function() {
			return {
				"id": 0,
				"project_id": 0,
				"completed": false,
				"request": new Request(),
				"response": new Response()
			}
		}
	});

	return Operation;
});