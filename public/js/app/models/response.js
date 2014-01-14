define([
	'backbone',
	'models/operation'
], function(Backbone, Operation) {
	'use strict';

	var Response = Operation.extend({
		defaults: {
			"protocol" : "",
			"header" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : []
			"trailer" : {},
			"status": "",
			"status_code" : -1
		}
	});

	return Response;
});