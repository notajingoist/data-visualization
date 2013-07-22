//Tumblr post harvester
var request = require('request');
var url = "http://api.tumblr.com/v2/blog/";
var params = {
	api_key: "5ylrgVqZaV28fCAouywHXLiAA8032palyB2gco13O55ie8euZl"
}
var qs = require('querystring');
var $ = require('jquery');

module.exports.tumblrPosts = function(callback, user, postType, optional) {
	$.extend(params, optional);
	request({
		url: url + user + '.tumblr.com/posts/' + postType + '?' + qs.stringify(params, '&'),
		json: true,
		timeout: 30000
	}, function(error, response, body) {
		if (error) {
			return console.log("CRAP");
		}
	
		var data = '';

		if (postType === 'photo') {
			var photos = new Array();
			var photoPosts = body.response.posts;
			for (var i = 0; i < photoPosts.length; i++) {
				for (var j = 0; j < photoPosts[i].photos.length; j++) {
					photos.push(photoPosts[i].photos[j].original_size.url);
				}
			}
			data = photos;
			callback(data);
		}

		else if (postType === 'text' && params.reblog_info) {
			var text = new Array();
			var textPosts = body.response.posts;
			// console.log(textPosts);
			for (var i = 0; i < textPosts.length; i++) {
				var textPost = textPosts[i];
				if (textPost.reblogged_from_id) {
					text.push({ 
						body: textPost.body,
						reblogged_from_id: textPost.reblogged_from_id,
						reblogged_from_url: textPost.reblogged_from_url,
						reblogged_from_name: textPost.reblogged_from_name,
						reblogged_root_url: textPost.reblogged_root_url,
						reblogged_root_name: textPost.reblogged_root_name,
						reblogged_root_title: textPost.reblogged_root_title
					});
				}
			}

			// reblogged_from_id: textPost.reblogged_from_id,
			// reblogged_from_url: textPost.reblogged_from_url,
			// reblogged_from_name: textPost.reblogged_from_name,
			// reblogged_root_url: textPost.reblogged_root_url,
			// reblogged_root_name: textPost.reblogged_root_name,
			// reblogged_root_title: textPost.reblogged_root_title
			data = text;
			console.log(data);
		}
		
		else if (postType === 'text') {
			var text = new Array();
			var textPosts = body.response.posts;
			// console.log(textPosts);
			for (var i = 0; i < textPosts.length; i++) {
				text.push(textPosts[i].body);
			}
			data = text;
		}


		// callback(data);
	});
}

