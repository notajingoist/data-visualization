var express = require('express');

module.exports = function(app) {

	app.configure('development', function() {

		//compass child process
		var cp = require('child_process');
		var compass = cp.spawn('compass', ['watch', '-c', 'config.rb'], 
			{ cwd: 'public' });
		
		//verbose error handling
		app.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));

	});
	
}