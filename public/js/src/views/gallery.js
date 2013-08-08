define([
	'backbone',
	'models/post'
], function(Backbone, Post) {
	return Backbone.View.extend({
	
		el: $('#gallery'),

		initialize: function() {
			this.listenTo(this.collection, {
				reset: this.render,
				add: this.addItem
			});
		},

		render: function() {
			this.collection.each(function(post) {
				this.addItem(post);
			}, this);
		},

		addItem: function(post) {
			//this.el.append('<img>', { href: post.get('url') });
			this.$el.append('<a href="' + post.get('url') + '">' +
				'<p>' + post.get('url') + '</p></a>');
		},

		// reset: function() {
		// 	this.el.html('');
		// 	return this;
		// }

		// render: function(url) {
		// 	var image = '<img src=\"' + url + '\">';
		// 	this.$el.append(image);
			
		// 	var images = $('img');
		// 	setTimeout(function() {
		// 		console.log('adding class');
		// 		$.each(images, function(i, el) {
		// 			//$(el).addClass('visible');
		// 			$(el).fadeIn(800);
		// 		});
		// 	});

		// 	//console.log($('img'));
		// 	//setTimeout($('img').addClass('visible'));
		// },

		// renderText: function(text) {
		// 	var paragraph = '<p class="block">' + text + '</p>';
		// 	this.$el.append(paragraph);
		// },

		// renderLink: function(link) {
		// 	var link = '<a href="' + link + '"><p class="block">' + link + '</p></a>'
		// 	this.$el.append(link);
		// },

		renderCircle: function(link) {
			// var diameter = 960,
			// 	format = d3.format(",d"),
			// 	color = d3.scale.category20c();

		}

	});
});