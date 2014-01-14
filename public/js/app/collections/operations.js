define([
	'backbone',
	'models/request',
	'models/response'
], function(Backbone, Request, Response) {
	var Operations = Backbone.Collection.extend({
		model: function(attrs, options) {
			if (attrs["message_type"] == "request") {
				console.log("New request");
				return new Request(attrs, options);
			} else {
				console.log("new response");
				return new Response(attrs, options);
			}
		}
	});

	return Operations;
});