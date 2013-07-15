//Nate's Instagram harvester example
var request = require('request');
var url = "http://api.tumblr.com/v2/tagged";
var params = {
	api_key: "5ylrgVqZaV28fCAouywHXLiAA8032palyB2gco13O55ie8euZl"
}
var qs = require('querystring');

module.exports.tumblrPictures = function(callback, tag) {
	params.tag = tag;
	request({
		url: url + '?' + qs.stringify(params, '&'),
		json: true,
		timeout: 30000
	}, function(error, response, body) {
		if (error) {
			return console.log("CRAP");
		}

		var photoData = new Array();
		body.response.map(function(tumblr) {
			if (tumblr.type === 'photo') {
				var photos = tumblr.photos;
				for (var i = 0; i < photos.length; i++) {
					photoData.push(photos[i].original_size.url);
				}
			}
		});

		//console.log(photoData);
		callback(photoData);
	});
}

