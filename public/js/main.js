requirejs.config({
	baseUrl: 'js/app',
	shim: {
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
		}
	},
	paths: {
		jquery: '../libs/jquery/jquery',
		underscore: '../libs/underscore/underscore',
		backbone: '../libs/backbone/backbone',
		socketio: '../libs/socket.io/socket.io',
		react: '../libs/react/react',
	}
});

requirejs(['feed'], function(feed) {
	feed.start();
});