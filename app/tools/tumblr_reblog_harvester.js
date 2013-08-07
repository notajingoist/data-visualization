//Tumblr reblog harvester
var request = require('request');
var url = "http://api.tumblr.com/v2/blog/";
var params = {
	api_key: "5ylrgVqZaV28fCAouywHXLiAA8032palyB2gco13O55ie8euZl",
	reblog_info: true
}
var qs = require('querystring');
var $ = require('jquery');

var TIMEOUT_INTERVAL = 15000; //not using right now
var postDatabase = {};

var parsePost = function(post) {
	return {
		id: post.id,
		url: post.post_url,
		blog_name: post.blog_name,
		reblogged_from_id: post.reblogged_from_id || '',
		reblogged_from_name: post.reblogged_from_name || '',
		reblogged_root_name: post.reblogged_root_name || ''
	}
}

var postDatabase = [];

module.exports.tumblrReblogPosts = function(callback, user, postType, optional) {
	var allPosts = $.Deferred();

	$.extend(params, optional);
	//timeout: TIMEOUT_INTERVAL
	request({
		url: url + user + '.tumblr.com/posts/' + postType + '?' + qs.stringify(params, '&'),
		json: true
	}, function(error, response, body) {
		if (error) {
			console.log('CRAP');
		}

		var responsePosts = body.response.posts; //array of user's posts
		
		var harvestedPosts = [];
		responsePosts.forEach(function(post, i) {
			harvestedPosts.push(harvest(post.id, post.blog_name, postType));
		});

		$.when.apply($, harvestedPosts).done(function() {
			allPosts.resolve();
		});
		
	});

	allPosts.done(function() {
		//console.log("POST DATABASE:", postDatabase);
		callback(postDatabase);
	});

}

var harvest = function(id, name, postType, parent) {
	var promise = $.Deferred();
	var post;

	request({
		url: url + name + '.tumblr.com/posts/' + postType + '?' 
		+ qs.stringify(params, '&') + '&id=' + id,
		json: true
	}, function(error, response, body) {
		if (error) {
			console.log('harvest error');
		}

		if (body.response.posts === undefined) {
			promise.resolve('');
		} else {
			var postResp = body.response.posts[0];
			post = parsePost(postResp);
			post.children = [];

			if (parent) {
				parent.children.push(post);
			} else {
				postDatabase.push(post);
			}

			var reblogPromises = recurse(post, postType);

			$.when.apply($, [reblogPromises]).done(function() {
				//console.log(post);
				//promise.resolve(post);
				promise.resolve();
			});

		}
	});

	return promise;
}

var recurse = function(post, postType) {
	if (post.reblogged_from_id === '') {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd;
	} else if (post.reblogged_from_name === post.reblogged_root_name) {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd;
	} else {
		return harvest(post.reblogged_from_id, post.reblogged_from_name, 
			postType, post);
	}
}


