/** @jsx React.DOM */
define([
	'react',
	'views/operationTimeline'
], function(React, OperationTimeline) {
	function generateHeaderView(headers, header) {
		return (
			React.DOM.div( {className:"row"}, 
				React.DOM.span( {className:"left header-title"}, header),
				React.DOM.span( {className:"right header-value"}, headers[header])
			)
		);
	};

	function generateHeaderViews(request) {
		if (request == null) {
			return (React.DOM.div(null));
		}

		var headers = request.headers;
		var headerViews = new Array();
		for (header in headers) {
			var headerVal = headers[header];
			headerViews.push(generateHeaderView(headers, header));
		}
		return headerViews;
	};

	var details = React.createClass({displayName: 'details',
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
				React.DOM.div(null, 
					React.DOM.h4(null, "Headers"),
					React.DOM.div( {className:"small-6 columns"}, 
						reqHeaders
					),
					React.DOM.div( {className:"small-6 columns"}, 
						resHeaders
					),
					React.DOM.h4(null, "Body")
				)
			);
			
		}
	});

	return details;
});