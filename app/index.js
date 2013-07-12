var express = require('express'),
	// routes = require('./routes'),
	//user = require('./routes/user'),
	http = require('http'),
	// path = require('path'),
	socket = require('socket.io');

var app = express();
app.set('port', process.env.PORT || 9292);

require('./settings')(app);

app.get('/', function(req, res) {
	res.render('index');
});


// app.get('/', routes.index);
// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
