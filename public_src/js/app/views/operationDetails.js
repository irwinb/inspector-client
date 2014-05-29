/** @jsx React.DOM */
define([
	'react',
	'views/operationTimeline',
	'utils/css'
], function(React, OperationTimeline, CSS) {
	var details = React.createClass({	
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
				<div className='row'>
					<div className='col-sm-12'>
						<span className='pull-left header-title'>{header}</span>
						<span className='pull-right header-value'>{headers[header]}</span>
					</div>
				</div>
			);
		},
		getHeaderViews: function (req) {
			if (req == null) {
				return (<div></div>);
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
				return (<div></div>);
			}

			var body = req.get('body');
			return (<div>{body}</div>)
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
				<div className='row operation-details'>
					<div className='col-sm-6 operation-request-wrapper'>
						<h5 className='operation-details-header'> Request</h5>
						{reqHeaders}
						<div className='operation-details-body well'>
							{reqBody}
						</div>
					</div>
					<div className='col-sm-6 operation-response-wrapper'>
						<h5 className='operation-details-header'>Response</h5>
						{resHeaders}
						<div className='operation-details-body well'>
							{resBody}
						</div>
					</div>
				</div>
			);
			
		}
	});

	return details;
});