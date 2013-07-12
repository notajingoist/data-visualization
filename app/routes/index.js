module.exports = function(app) {
	//pages
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/test', function(req, res) {
		res.render('test');
	});

	//errors
	app.get('/404', function(req, res, next) {
		next();
	});

	app.get('/403', function(req, res, next) {
		var err = new Error('Not allowed!');
		err.status = 403;
		next(err);
	});

	app.get('/500', function(req, res, next) {
		next(new Error());
	});

}