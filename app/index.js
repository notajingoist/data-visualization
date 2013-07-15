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
var instagram_harvester = require('./tools/instagram_harvester');
var tumblr_harvester = require('./tools/tumblr_harvester');

//sockets
var clientTimers = {};
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

	getTumblrPictures(socket);
	
	var timer = setInterval(function() {
		getTumblrPictures(socket);
	}, 3500);


	// getInstagramPictures(socket);
	
	// var timer = setInterval(function() {
	// 	getInstagramPictures(socket);
	// 	//socket.emit('updateInstagramPictures', 'Yayyy');
	// }, 2000);

	clientTimers[socket.id] = timer;

	socket.on('disconnect', function() {
		console.log('client disconnected');
		var timerId = clientTimers[socket.id];
		clearInterval(timerId);
	});

});


var getInstagramPictures = function(socket) {
	instagram_harvester.instagramPictures(function(data) {
		//socket.emit('update', "Yayyy");
		socket.emit('updateInstagramPictures', data);
	});
}

var getTumblrPictures = function(socket) {
	tumblr_harvester.tumblrPictures(function(data) {
		socket.emit('updateTumblrPictures', data);
	}, 'viget');
}

//boot
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
