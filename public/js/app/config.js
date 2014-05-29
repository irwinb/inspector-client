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
		'backbone-relational': {
			deps: ['backbone']
		},
		'nprogress' : {
			exports: 'nprogress'
		},
		'progress' : {
			exports: 'progress'
		},
		'bootstrap' : {
			deps: ['jquery']
		}
	},
	paths: {
		modernizr: '../../libs/modernizr/modernizr.js',
		jquery: '../../libs/jquery/dist/jquery',
		underscore: '../../libs/underscore/underscore',
		backbone: '../../libs/backbone/backbone',
		'backbone-relational': '../../libs/backbone-relational/backbone-relational',
		socketio: '../../libs/socket.io-client/dist/socket.io',
		react: '../../libs/react/react-with-addons',
		nprogress: '../../libs/nprogress/nprogress',
		progress: '../app/utils/progress',
		bootstrap: '../../libs/bootstrap/dist/js/bootstrap'
	}
});