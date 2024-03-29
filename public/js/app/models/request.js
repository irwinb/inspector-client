define([
	'backbone',
	'backbone-relational'
], function(Backbone) {
	'use strict';

	var Request = Backbone.RelationalModel.extend({
		defaults: {
			"protocol" : "",
			"headers" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : [],
			"method" : "",
			"host": "",
			"remote_addr" : "",
			"request_uri" : "",
			"timestamp": 0
		}
	});

	return Request;
});