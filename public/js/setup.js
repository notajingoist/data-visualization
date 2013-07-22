/**
 * @name RequireJS Setup
 * @desc Responsible for setting up requirejs, 
 *      then loading the main app
 */

 /*
	urlArgs: "bust=" +  (new Date()).getTime(),
 */

 // nodes: "src/nodes",
 // account: 'src/nodes/account',
 // articles: 'src/nodes/articles',
 // chrome: 'src/nodes/chrome',

requirejs.config({

	baseUrl: "/js",
	
	paths: {
		backbone: "vendor/backbone",
		jquery: "vendor/jquery",
		underscore: "vendor/underscore",
		socketio: "../../socket.io/socket.io",
		three: "vendor/three",
		d3: "vendor/d3",

		application: "src/application",
		models: "src/models",
		collections: "src/collections",
		routers: "src/routers",
		views: "src/views",
		templates: "src/templates",
	},

	shim: {
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: "Backbone"
		},
		socketio: {
			exports: 'io'
		}
	}
});

require([
		'views/gallery',
		'application'
], function(App){
	//console.log(App);
	Backbone.history.start();
});
