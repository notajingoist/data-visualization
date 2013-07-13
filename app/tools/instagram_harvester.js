//Nate's Instagram harvester example
var request = require('request');
var url = "https://api.instagram.com/v1/media/popular";
var params = {
	client_id: "9b137f4ea8a842bd8b970cb7855c612d"
}

var qs = require('querystring');

module.exports.instagramPictures = function(callback) {
	request({
		url: url + '?' + qs.stringify(params),
		json: true,
		timeout: 30000
	}, function(error, response, body) {
		if (error) {
			return console.log("CRAP");
		}

		var data = (body.data.map(function(inst) { 
			return inst.images.standard_resolution.url; 
		}));
		
		callback(data);
	});
}

