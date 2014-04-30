/** @jsx React.DOM */
define([
	'react',
	'views/operation'
], function(React, OperationView) {
	'use strict';

	var operationView = React.createClass({displayName: 'operationView',
		getInitialState: function() {
			return {
				operations: this.props.initialOperations
			}
		},
		render: function() {
			var operations = this.state.operations.map(function(operation) {
				return OperationView( {operation:operation});
			});

			return (
				React.DOM.div(null, 
					React.DOM.h2(null, "Feed"), " - ", React.DOM.h3(null, this.props.project.get('name')),
					React.DOM.div( {className:"row"}, 
						operations
					)
				)
			);
		}
	});

	return operationView;
});