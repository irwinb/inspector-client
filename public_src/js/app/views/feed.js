/** @jsx React.DOM */
define([
	'react',
	'views/operation'
], function(React, OperationView) {
	'use strict';

	var operationView = React.createClass({
		getInitialState: function() {
			return {
				operations: this.props.initialOperations
			}
		},
		render: function() {
			var operations = this.state.operations.map(function(operation) {
				return <OperationView operation={operation}/>;
			});

			return (
				<div>
					<h2>Feed</h2> - <h3>{this.props.project.get('name')}</h3>
					<div className='row'>
						{operations}
					</div>
				</div>
			);
		}
	});

	return operationView;
});