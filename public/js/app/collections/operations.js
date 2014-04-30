define([
	'backbone',
	'models/operation'
], function(Backbone, Operation) {
	'use strict';
	
	var Operations = Backbone.Collection.extend({
		model: Operation
	});

	return Operations;
});