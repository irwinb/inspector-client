define([
	'backbone',
], function(Backbone) {
	'use strict';

	var Response = Backbone.Model.extend({
		defaults: {
			"protocol" : "",
			"headers" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : [],
			"trailer" : {},
			"status": "",
			"status_code" : -1
		}
	});

	return Response;
});