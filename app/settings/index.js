var express = require('express');

var views = __dirname + '/../../pages',
	static_root = __dirname + '/../../public';

var app_info = require(__dirname + '/../../package.json');

module.exports = function(app) {
	var env = app.settings.env;

	//global config
	app.configure(function() {

		app.set('views', views);
		app.set('view engine', 'ejs');

		app.locals({
			development : env === 'development',
			production: env === 'production',
			site_title : app_info.name,
			site_description : app_info.description,
			site_version : app_info.version,
		});

		//log
		app.use(express.logger('dev'));

		//parses x-www-form-urlencoded request bodies (and json)
		app.use(express.bodyParser());
		app.use(express.methodOverride());

		//express routing
		app.use(app.router);

		//static resources
		app.use(express.favicon());
		app.use(express.static(static_root));

		//gzip files
		app.use(express.compress());

		//500 status
		app.use(function(err, req, res, next) {
			res.render('500', {
				status: err.status || 500,
				error: err
			});
		});

		//404 status
		app.use(function(req, res, next) {
			res.render('404', {
				status: 404,
				url: req.url
			});
		});

	});

	if ('development' === env) {
		require('./development')(app);
	}

	if ('production' === env) {
		require('./production')(app);
	}

}
