define([
	'backbone',
	'backbone-relational'
], function(Backbone) {
	'use strict';

	var Response = Backbone.RelationalModel.extend({
		defaults: {
			"protocol" : "",
			"headers" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : [],
			"trailer" : {},
			"status": "",
			"status_code" : -1,
			"timestamp": 0
		}
	});

	return Response;
});