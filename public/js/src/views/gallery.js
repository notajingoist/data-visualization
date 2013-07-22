define(['backbone'], function(Backbone) {
	var Gallery = Backbone.View.extend({
	
		el: $('#gallery'),

		initialize: function() {
			// this.collection = new Collection();
			// this.listenTo(this.collection, {
			// 	reset: this.render,
			// 	add: this.addItem
			// });
		},

		// render: function() {
		// 	this.collection.each(this.addItem, this);
		// 	return this;
		// },

		// addItem: function() {
		// 	this.$el.append("<img>", { href: model.get('url')});
		// }

		render: function(url) {
			var image = '<img src=\"' + url + '\">';
			this.$el.append(image);
			
			var images = $('img');
			setTimeout(function() {
				console.log('adding class');
				$.each(images, function(i, el) {
					//$(el).addClass('visible');
					$(el).fadeIn(800);
				});
			});

			//console.log($('img'));
			//setTimeout($('img').addClass('visible'));
		},

		renderText: function(text) {
			var paragraph = '<p class="block">' + text + '</p>';
			this.$el.append(paragraph);
		},

		renderLink: function(link) {
			var link = '<a href="' + link + '"><p class="block">' + link + '</p></a>'
			this.$el.append(link);
		}

	});

	return Gallery;
});