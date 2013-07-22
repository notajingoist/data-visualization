//Tumblr reblog harvester
var request = require('request');
var url = "http://api.tumblr.com/v2/blog/";
var params = {
	api_key: "5ylrgVqZaV28fCAouywHXLiAA8032palyB2gco13O55ie8euZl",
	reblog_info: true
}
var qs = require('querystring');
var $ = require('jquery');

//var harvester = this;

var requestIndividualPost = function(user, postType, params, postId) {
	var dfd = $.Deferred();
	request({
		url: url + user + '.tumblr.com/posts/' + postType + '?' 
		+ qs.stringify(params, '&') + '&id=' + postId,
		json: true, 
		timeout: 30000
	}, function(error, response, body) {
		if (error) {
			return 'error';
		}
		dfd.resolveWith(this, [body.response]);
	});
	return dfd.promise();
}

var parsePosts = function(body) {
	var allPosts = body.response.posts;
	var postIds = new Array();
	for (var i = 0; i < allPosts.length; i++) {
		postIds.push(
			{
				id: allPosts[i].id,
				url: allPosts[i].post_url
			});
	}
	return postIds;
}

var parseReblogInfo = function(resp) {
	var post = resp.posts[0];
	var id = post.reblogged_from_id || '';
	var name =  post.reblogged_from_name || '';
	var source = post.reblogged_root_name || '';

	var reblogInfo = {
		reblogged_from_id: id,
		reblogged_from_name: name,
		reblogged_from_source: source
	};

	if (id && name === source) {
		reblogInfo.reblog = true;
		reblogInfo.reblog_source = true;
	} else if (id) {
		reblogInfo.reblog = true;
		reblogInfo.reblog_source = false;
	} else {
		reblogInfo.reblog = false;
		reblogInfo.reblog_source = false;
	}	
	
	return reblogInfo;
}

module.exports.tumblrReblogPosts = function(callback, user, postType, optional) {
	var dfd = $.Deferred();
	$.extend(params, optional);
	request({
		url: url + user + '.tumblr.com/posts/' + postType + '?' + qs.stringify(params, '&'),
		json: true,
		timeout: 30000
	}, function(error, response, body) {
		if (error) {
			return console.log("CRAP");
		}

		var posts = parsePosts(body);
		var reqs = new Array();
		for (var i = 0; i < posts.length; i++) (function(n) {
			//stupid for loop...damn closures....
			reqs[n] = requestIndividualPost(user, postType, params, posts[i].id);
			reqs[n].done(function(post) {
				$.extend(posts[n], parseReblogInfo(post));
			});
		})(i);
		
		$.when(reqs[0], reqs[1], reqs[2], reqs[3], reqs[4], reqs[5], 
			reqs[6], reqs[7], reqs[8], reqs[9], reqs[10], reqs[11], 
			reqs[12], reqs[13], reqs[14], reqs[15], reqs[16], reqs[17], 
			reqs[18], reqs[19]).done(function() {

			dfd.resolveWith(this, [posts]);
		});

	});

	dfd.done(function(posts) {
		//console.log(posts);
		callback(posts);
	});
}

