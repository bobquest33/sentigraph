const mongo = require(__dirname + "/../models/mongo.js"); 
const api_base = 'https://api.twitter.com/';
const lib = require(__dirname + "/../models/functions.js");
const config = require(__dirname + "/../../twitterconfig.js").config;


var date = lib.getDateForNames(0);
var request = require('request');

mongo.run(function(db) {
	var col = db.collection('twitterhashtags'),
	hashtags = [];

	col.find({}).toArray(function(err, items) {
		if(err !== null || items.length < 1) {
			return;
		}
		retrieveTweets(items);
	});


});

function retrieveTweets(hashtags) {
var bearer_token_cred = new Buffer(config.api_key + ":" + config.api_secret).toString('base64');

	request({
	url : api_base + 'oauth2/token?grant_type=client_credentials',
	    method: "POST",
		headers : {
'Authorization' : ' Basic ' + bearer_token_cred
		},
	    json: true, 
	body: {}
}, function(error, response, result){
	
	if(typeof result.token_type === "undefined" || result.token_type !== "bearer") {
		throw new Error("Could not retrieve token from twitter");
	}

	var bearer_token = result.access_token;
	hashtags.forEach(function(item) {
		var url = api_base + '1.1/search/tweets.json';
		url += '?q=' + item.data.replace('#', '%23');
		
		if(item.since_id > 0) {
			url += '&since_id=' + item.since_id;
		}
		url += '&lang=en&locale=en&result_type=recent&count=5&include_entities=false';

		request({
			url : url,
			method: 'GET',
			headers: {
				'Authorization' : 'Bearer ' + bearer_token
			}
		}, function(error, response, body) {
			var r = JSON.parse(body);
			console.log(r.statuses.map(function(s) { return s.text; }));
			mongo.run(function(db){
				var col = db.collection('sentences' + date);
				col.insertMany(r.statuses.map(function(s) { return {data: s.text, dateAdded: new Date()};  }), function(err, result){
					console.log(result);
					process.exit();
				}); 
			});
		});
	});
});

}
