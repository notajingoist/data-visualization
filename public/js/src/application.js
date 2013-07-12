/**
 * @name Application
 * @desc The brain of the application
 */

 /*

 ,
	'account/node.account',
	'articles/node.articles',
	'chrome/node.chrome'

	function(Backbone, Account, Articles, Chrome)

*/

define([
	'backbone',
	'socketio'
], function(Backbone) {

	var Application = Backbone.View.extend({

		el: document.body,

		initialize: function() {

			this.connectSocket();


			// this.account = new Account();
			// this.articles = new Articles();
			// this.chrome = new Chrome({
			// 	model: this.account.user
			// });
		},

		connectSocket: function() {
			//socket.io
			var socket = io.connect('http://localhost');

			socket.on('update', function (data) {
			 	console.log(data);
				//socket.emit('my other event', { my: 'data' });
			});
		}

	});

	return new Application();
});
