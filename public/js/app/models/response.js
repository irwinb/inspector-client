define([
	'backbone'
] function(Backbone) {
	'use strict';

	var Response = Backbone.models.extend({
		defaults: {
			"protocol" : "",
			"header" : {},
			"trailer" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : [],
			"status": "",
			"status_code" : -1
		}
	});

	return Response;
});