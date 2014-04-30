define([
	'backbone'
], function(Backbone) {
	'use strict';

	var Request = Backbone.Model.extend({
		defaults: {
			"protocol" : "",
			"headers" : {},
			"body" : "",
			"content_length" : -1,
			"transfer_encoding" : [],
			"method" : "",
			"host": "",
			"remote_addr" : "",
			"request_uri" : ""
		}
	});

	return Request;
});