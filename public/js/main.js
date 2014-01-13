requirejs.config({
	baseUrl: 'js/libs',
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
		jquery: 'jquery/jquery',
		underscore: 'underscore/underscore',
		backbone: 'backbone/backbone',
		socketio: 'socket.io/socket.io',
		react: 'react/react',
		app: '../app'
	}
});

requirejs(['app/app'], function(app) {
	app.start();
});