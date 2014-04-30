/** @jsx React.DOM */
requirejs.config({
	baseUrl: 'js/app',
	shim: {
		'modernizr' : {
			exports: "Modernizr"
		},
		'socketio': {
			exports: 'io'
		},
		'underscore' : {
			exports: "_"
		},
		'react' : {
			exports: "React"
		},
		'backbone' : {
			deps: [
				'underscore',
				'jquery'
			],
			exports: "Backbone"
		},
		'foundation' : {
			exports: 'foundation'
		}
	},
	paths: {
		modernizr: '../libs/modernizr/modernizr.js',
		jquery: '../libs/jquery/jquery',
		underscore: '../libs/underscore/underscore',
		backbone: '../libs/backbone/backbone',
		socketio: '../libs/socket.io/socket.io',
		react: '../libs/react/react',
		foundation: '../libs/foundation/js/foundation'
	}
});

requirejs([
	'jquery',
	'../domReady!',
	'foundation',
	'react',
	'feed',
	'views/feed'
], function($, doc, Foundation, React, Feed, FeedView) {
	var feedView = React.renderComponent(
		<FeedView initialOperations={Feed.currentProject.get('operations')} project={Feed.currentProject}/>,
		$('#feedContainer')[0]
	);
	var collectionChanged = function() {
		feedView.setState({
			operations: Feed.currentProject.get('operations')
		});
	};
	var operationChanged = function() {
		feedView.setState({
			operations: Feed.currentProject.get('operations')
		});
	};
	Feed.currentProject.get('operations').on('add', collectionChanged);
	Feed.currentProject.get('operations').on('change', operationChanged);
});