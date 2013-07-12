/**
 * @name Data Visualization App
 */

var express = require('express');
var http = require('http');
var app = module.exports = express();
var server = http.createServer(app);
app.set('port', process.env.PORT || 9292);

//configuration
require('./settings')(app);

//routes
var routes = require('./routes')(app);

//tools (harvester)
var harvester = require('./tools/harvester');

//sockets
var clientTimers = {};
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

	getPictures(socket);
	
	var timer = setInterval(function() {
		getPictures(socket);
	}, 10000);

	clientTimers[socket.id] = timer;

	socket.on('disconnect', function() {
		console.log('client disconnected');
		var timerId = clientTimers[socket.id];
		clearInterval(timerId);
	});

});

var getPictures = function(socket) {
	socket.emit('update', "Yayyy");
}

//boot
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
