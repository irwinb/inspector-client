define([
	'backbone',
	'models/operation',
	'backbone-relational'
], function(Backbone, Operation) {
	'use strict';
	
	var Operations = Backbone.Collection.extend({
		model: Operation,
		comparator: function (left, right) {
			var lStamp = left.get('request').get('timestamp');
			var rStamp = right.get('request').get('timestamp');
			if (rStamp < lStamp) {
				return -1;
			} else if (rStamp > lStamp) {
				return 1;
			} else {
				return 0;
			}
		}
	});
	return Operations;
});