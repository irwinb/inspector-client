define([
	"backbone",
	"project",
	"request",
	"response",
], function(Backbone, Project, Request, Response) {
	var ProxyRequest = Backbone.models.extend({
		defaults : {
			"transaction_id": -1,
			"message_type" : "",
			"error_message" : "",
			"error_code" : "",
			"project" : new Project(),
			"request" : new Request(),
			"response" : new Response()
		}
	});

	return ProxyRequest;
});