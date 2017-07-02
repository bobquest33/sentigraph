const watson = require(__dirname + "/../models/watson.js");
const mongo = require(__dirname + "/../models/mongo.js");
const lib = require(__dirname + "/../models/functions.js");


var date = lib.getDateForNames(-2);

mongo.run(function(db){
	var col = db.collection('sentences' + date),
	text = "";

	col.find({}).toArray(function(err, docs) {
		text = docs.map(function(item){
			return item.data;
		}).join("\n");

		storeWatsonData(text);
	});
});

function storeWatsonData(text) {
	watson.getData(text, function(data){
		var insert = data.map(function(item){
			var tmp = {};
			tmp.text = item.text;
			tmp.emotion_tone = item.emotion_tone;
			return tmp;
		});

		mongo.run(function(db){
			
			var col = db.collection('watsondata' + date);
			col.insertOne({data : insert, dateAdded : new Date()}, function(err, result){
				if(err) { throw err; }

			});
		});
	}); 
}

