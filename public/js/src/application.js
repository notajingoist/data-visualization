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
	'socketio',
	'views/gallery'
], function(Backbone, io, Gallery) {

	var Application = Backbone.View.extend({

		el: document.body,

		initialize: function() {
			this.gallery = new Gallery();
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
			var gallery = this.gallery;
			socket.on('updateInstagramPictures', function(data) {
				//gallery.render(data);
			 	$.each(data, function(i, url) {
			 		gallery.render(url);
			 	});
			 	//console.log('Instagram pics:\n', data);
				//socket.emit('my other event', { my: 'data' });
			});

			socket.on('updateTumblrPictures', function(data) {
				$.each(data, function(i, url) {
			 		gallery.render(url);
			 	});
			});
		}

	});

	return new Application();
});
