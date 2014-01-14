define([
	'backbone',
	'models/operation'
], function(Backbone, Operation) {
	'use strict';

	var Request = Operation.extend({
		defaults: {
			"protocol" : "",
			"header" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : []
			"method" : "",
			"host": "",
			"remote_addr" : "",
			"request_uri" : ""
		}
	});

	return Request;
});