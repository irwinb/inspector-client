/** @jsx React.DOM */
define([
	'react',
	'views/operationTimeline'
], function(React, OperationTimeline) {
	function generateHeaderView(headers, header) {
		return (
			<div className='row'>
				<span className='left header-title'>{header}</span>
				<span className='right header-value'>{headers[header]}</span>
			</div>
		);
	};

	function generateHeaderViews(request) {
		if (request == null) {
			return (<div></div>);
		}

		var headers = request.headers;
		var headerViews = new Array();
		for (header in headers) {
			var headerVal = headers[header];
			headerViews.push(generateHeaderView(headers, header));
		}
		return headerViews;
	};

	var details = React.createClass({
		getInitialState: function() {
			return {
				expanded: true
			}
		},
		render: function() {
			var request = this.props.operation.get('request');
			var response = this.props.operation.get('response');
			var reqHeaders = generateHeaderViews(request);
			var resHeaders = generateHeaderViews(response);
			return (
				<div>
					<h4>Headers</h4>
					<div className='small-6 columns'>
						{reqHeaders}
					</div>
					<div className='small-6 columns'>
						{resHeaders}
					</div>
					<h4>Body</h4>
				</div>
			);
			
		}
	});

	return details;
});