var express = require('express');

module.exports = function(app) {

	app.configure('development', function() {

		var cp = require('child_process');
		var compass = cp.spawn('compass', ['watch', '-c', 'config.rb']);

		//verbose error handling
		app.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));

	});
	
}