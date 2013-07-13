define(['backbone'], function(Backbone) {
	var Gallery = Backbone.View.extend({
	
		el: $('#gallery'),

		initialize: function() {
		},

		render: function(url) {
			//console.log('rendering...');
			//this.$el.append('<p>' + url + '</p>');
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
		}

	});

	return Gallery;
});