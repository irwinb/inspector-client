/** @jsx React.DOM */
define([
	'react',
	'views/operationDetails',
	'utils/constants'
], function(React, OperationDetails, Const) {
	'use strict';

	var operationView = React.createClass({
		handleClick: function () {
			this.refs.operationDetails.toggleExpanded();
		},
		getId: function () {
			return 'operation' + this.props.operation.get('id');
		},
		render: function() {
			var request = this.props.operation.get('request');
			var response = this.props.operation.get('response');
			var completed = this.props.operation.get('completed');

			var durationCol = ' ';
			if (completed) {
				var diff = response.get('timestamp') - request.get('timestamp');
				durationCol += (new Date(response.get('timestamp')/1000000)).toLocaleString();
				durationCol += ' in ' + (parseInt(diff/1000000, 10)).toString();
				durationCol += 'ms';
			} else {
				durationCol += ' -'
			}

			var operationClass = 'operation-p-pending';
			if (completed) {
				var status_code = response.get('status_code');
				if (status_code == 200) {
					operationClass = 'operation-p-200';
				} else if (status_code >= 300 && status_code < 400) {
					operationClass = 'operation-p-300';
				} else if (status_code >= 400 && status_code < 500) {
					operationClass = 'operation-p-400';
				} else if (status_code >= 500 && status_code < 600) {
					operationClass = 'operation-p-500';
				}
			}
			operationClass = 'operation-preview '+ operationClass;

			var requestUri = request.get('request_uri').substr(Const.proxyPath().length + 1);
			return (
				<div className={operationClass} id={this.getId()} onClick={this.handleClick}>
					<div className='row'>
						<div className='col-sm-1'>
							<span className='operation-p-method'>{request.get('method')}</span>
						</div>
						<div className='col-sm-6'>
							<span className='operation-p-uri'>{requestUri}</span>
						</div>
						<div className='col-sm-4'>
							<span className='glyphicon glyphicon-time'></span>{durationCol}
						</div>
						<div className='col-sm-1'>
							<span className={completed ? 'operation-p-code' : 'hide'}>{response != null ? response.get('status_code') : ''}</span>
							<img src='img/pending.GIF' className={completed ? 'hide' : ''}/>
						</div>
						<span className='pull-left'>
						</span>
						<span className='pull-right'>
						</span>
					</div>
					<OperationDetails ref={'operationDetails'} operation={this.props.operation}/>
				</div>
			);
		}
	});

	return operationView;
});