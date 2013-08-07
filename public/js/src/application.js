/**
 * @name Application
 * @desc The brain of the application
 */

define([
	'backbone',
	'socketio',
	'views/gallery',
	'collections/posts',
	'models/post'
], function(Backbone, io, Gallery, Posts, Post) {

	var Application = Backbone.View.extend({

		el: document.body,

		initialize: function() {

			this.postsCollection = new Posts();
			this.gallery = new Gallery({
				collection: this.postsCollection
			});
			
			this.connectSocket();
		},

		connectSocket: function() {
			var socket = io.connect('http://localhost');
			var gallery = this.gallery;
			var postsCollection = this.postsCollection;
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
				//console.log(data);
				$.each(data, function(i, postData) {
					// gallery.renderLink(post.url);
					// gallery.renderCircle(post.url);
					//console.log(post);
					var post = new Post(postData);
					postsCollection.add(post);
				});
			});
		}

	});

	return new Application();
});
