/** @jsx React.DOM */
define([
	'react',
	'views/operationTimeline',
	'utils/css'
], function(React, OperationTimeline, CSS) {
	var details = React.createClass({displayName: 'details',	
		expand: function (div) {
			CSS.addClass(div, 'operation-details-expanded');
		},
		collapse: function (div) {
			CSS.removeClass(div, 'operation-details-expanded');
		},
		toggleExpanded: function () {
			var div = this.getDOMNode();
			if (CSS.hasClass(div, 'operation-details-expanded')) {
				this.collapse(div);
			} else {
				this.expand(div);
			}
		},
		getHeaderView: function (headers, header) {
			return (
				React.DOM.div( {className:"row"}, 
					React.DOM.div( {className:"col-sm-12"}, 
						React.DOM.span( {className:"pull-left header-title"}, header),
						React.DOM.span( {className:"pull-right header-value"}, headers[header])
					)
				)
			);
		},
		getHeaderViews: function (req) {
			if (req == null) {
				return (React.DOM.div(null));
			}

			var headers = req.get('headers');
			var headerViews = new Array();
			for (header in headers) {
				var headerVal = headers[header];
				headerViews.push(this.getHeaderView(headers, header));
			}
			return headerViews;
		},
		getBodyView: function (req) {
			if (req == null) {
				return (React.DOM.div(null));
			}

			var body = req.get('body');
			return (React.DOM.div(null, body))
		},
		getInitialState: function() {
			return {
				expanded: true
			}
		},
		render: function() {
			var request = this.props.operation.get('request');
			var response = this.props.operation.get('response');
			var reqHeaders = this.getHeaderViews(request);
			var resHeaders = this.getHeaderViews(response);
			var reqBody = this.getBodyView(request);
			var resBody = this.getBodyView(response);
			return (
				React.DOM.div( {className:"row operation-details"}, 
					React.DOM.div( {className:"col-sm-6 operation-request-wrapper"}, 
						React.DOM.h5( {className:"operation-details-header"},  " Request"),
						reqHeaders,
						React.DOM.div( {className:"operation-details-body well"}, 
							reqBody
						)
					),
					React.DOM.div( {className:"col-sm-6 operation-response-wrapper"}, 
						React.DOM.h5( {className:"operation-details-header"}, "Response"),
						resHeaders,
						React.DOM.div( {className:"operation-details-body well"}, 
							resBody
						)
					)
				)
			);
			
		}
	});

	return details;
});