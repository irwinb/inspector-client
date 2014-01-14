define([
	'backbone',
	'models/request',
	'models/response'
], function(Backbone, Request, Response) {
	'use strict';

	var Operation = Backbone.Model.extend({
		defaults: {
			""
		}
	});

	return Operation;
});