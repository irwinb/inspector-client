/** @jsx React.DOM */
define([
	'react',
	'views/operationDetails'
], function(React, OperationDetails) {
	'use strict';

	var operationView = React.createClass({displayName: 'operationView',
		render: function() {
			var request = this.props.operation.get('request');
			var response = this.props.operation.get('response');
			var completed = this.props.operation.get('completed');
			var operationClass = 'operation-p-pending';
			if (completed) {
				if (response.status_code == 200) {
					operationClass = 'operation-p-200';
				} else if (response.status_code >= 300 && response.status_code < 400) {
					operationClass = 'operation-p-300';
				} else if (response.status_code >= 400 && response.status_code < 500) {
					operationClass = 'operation-p-400';
				} else if (response.status_code >= 500 && response.status_code < 600) {
					operationClass = 'operation-p-500';
				}
			}
			operationClass = 'row operation-preview '+ operationClass;
			return (
				React.DOM.div( {className:operationClass}, 
					React.DOM.span( {className:"left"}, 
						React.DOM.span( {className:"operation-p-method"}, request.method),
						React.DOM.span( {className:"operation-p-uri"}, request.request_uri)
					),
					React.DOM.span( {className:"right"}, 
						React.DOM.span( {className:completed ? 'operation-p-code' : 'hide'}, response != null ? response.status_code : ''),
						React.DOM.img( {src:"img/pending.GIF", className:completed ? 'hide' : ''})
					)
				)
			);
		}
	});

	return operationView;
});