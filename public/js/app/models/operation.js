define([
	'backbone',
	'models/request',
	'models/response',
	'backbone-relational'
], function(Backbone, Request, Response) {
	'use strict';

	var Operation = Backbone.RelationalModel.extend({
		relations: [
		{
			type: Backbone.HasOne,
			key: 'request',
			relatedModel: Request
		},
		{
			type: Backbone.HasOne,
			key: 'response',
			relatedModel: Response
		}],
		defaults: function() {
			return {
				"id": 0,
				"project_id": 0,
				"completed": false
			}
		}
	});

	return Operation;
});