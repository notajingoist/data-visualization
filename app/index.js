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

//sockets
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	socket.emit('update', "Yayyy");
});

//routes
require('./routes')(app);

//boot
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
