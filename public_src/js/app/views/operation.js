/** @jsx React.DOM */
define([
	'react',
	'views/operationDetails'
], function(React, OperationDetails) {
	'use strict';

	var operationView = React.createClass({
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
				<div className={operationClass}>
					<span className='left'>
						<span className='operation-p-method'>{request.method}</span>
						<span className='operation-p-uri'>{request.request_uri}</span>
					</span>
					<span className='right'>
						<span className={completed ? 'operation-p-code' : 'hide'}>{response != null ? response.status_code : ''}</span>
						<img src='img/pending.GIF' className={completed ? 'hide' : ''}/>
					</span>
				</div>
			);
		}
	});

	return operationView;
});