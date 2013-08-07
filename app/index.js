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
var tumblr_post_harvester = require('./tools/tumblr_post_harvester');
var tumblr_reblog_harvester = require('./tools/tumblr_reblog_harvester');

var INTERVAL = 10000;

//sockets
var clientTimers = {};
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

	getTumblrReblogPosts(socket);
	var timer = setInterval(function() {
		getTumblrReblogPosts(socket);
	}, INTERVAL);

	// getTumblrPhotoPosts(socket);
	// var timer = setInterval(function() {
	// 	getTumblrPhotoPosts(socket);
	// }, 3500);

	// getTumblrTextPosts(socket);
	// var timer = setInterval(function() {
	// 	getTumblrTextPosts(socket);
	// }, 3500);

	// getTumblrPictures(socket);
	// var timer = setInterval(function() {
	// 	getTumblrPictures(socket);
	// }, 3500);
// 

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

var getTumblrPhotoPosts = function(socket) {
	tumblr_post_harvester.tumblrPosts(function(data) {
		socket.emit('updateTumblrPhotoPosts', data);
	}, 'vigetinterns13', 'photo', {});
}

var getTumblrTextPosts = function(socket) {
	tumblr_post_harvester.tumblrPosts(function(data) {
		socket.emit('updateTumblrTextPosts', data);
	}, 'notajingoist', 'text', { reblog_info: true });
}

var getTumblrReblogPosts = function(socket) {
	tumblr_reblog_harvester.tumblrReblogPosts(function(data) {
		socket.emit('updateTumblrReblogPosts', data);
	}, 'notajingoist', '', { reblog_info: true });
}

//boot
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
