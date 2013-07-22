/**
 * @name Application
 * @desc The brain of the application
 */

define([
	'backbone',
	'socketio',
	'views/gallery'
], function(Backbone, io, Gallery) {

	var Application = Backbone.View.extend({

		el: document.body,

		initialize: function() {
			//this.collection = new Collection();
			this.gallery = new Gallery();
			this.connectSocket();
			// this.account = new Account();
			// this.articles = new Articles();
			// this.chrome = new Chrome({
			// 	model: this.account.user
			// });
		},

		connectSocket: function() {
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

			socket.on('updateTumblrPhotoPosts', function(data) {
				//console.log(data);
				$.each(data, function(i, url) {
					//this.collection.add(url);
					gallery.render(url);
				});
			});

			socket.on('updateTumblrTextPosts', function(data) {
				//console.log(data);
				$.each(data, function(i, text) {
					gallery.renderText(text);
				});
			});

			socket.on('updateTumblrReblogPosts', function(data) {
				console.log(data);
				$.each(data, function(i, post) {
					gallery.renderLink(post.url);
				});
			});
		}

	});

	return new Application();
});
