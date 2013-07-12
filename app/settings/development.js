var express = require('express');

module.exports = function(app) {

	app.configure('development', function() {

		//verbose error handling
		app.use(express.errorHandler({
			dumpExceptions: true,
			showStack: true
		}));

	});
	
}