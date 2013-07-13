define(['backbone'], function(Backbone) {
	var Gallery = Backbone.View.extend({
	
		el: $('#gallery'),

		initialize: function() {
		},

		render: function(url) {
			console.log('rendering...');
			//this.$el.append('<p>' + url + '</p>');
			var image = '<img src=\"' + url + '\">';
			this.$el.append(image);
		}

	});

	return Gallery;
});