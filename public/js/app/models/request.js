define([
	'backbone'
] function(Backbone) {
	'use strict';

	var Request = Backbone.models.extend({
		defaults: {
			"method" : "",
			"protocol" : "",
			"header" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : [],
			"host": "",
			"remote_addr" : "",
			"request_uri" : ""
		}
	});

	return Request;
});