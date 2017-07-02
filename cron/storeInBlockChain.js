const mongo = require(__dirname + "/../models/mongo.js");
const lib = require(__dirname + "/../models/functions.js");
const eth = require(__dirname + "/../models/ethereum.js");

var date = lib.getDateForNames(-3);

mongo.run(function(db){
//	var col = db.collection('watsondata' + date);
	var col = db.collection('watsondata17070119');
	col.find({}).toArray(function(err, docs) {
		var tones =  { 
			anger: 0,
			disgust: 0,
			fear: 0,
			joy: 0,
			sadness: 0 
		},
		total = 0;

		docs.forEach(function(item){
			item.data.map(function(item2) { 
				item2.emotion_tone.forEach(function(item3){
					for(var i in tones) {
						if(typeof item3[i] !== "undefined") {
							tones[i] += parseFloat(item3[i]);	
						}
					}
				});

				if(item2.emotion_tone.length > 0) {
					total++;
				}
			});
		});

		for(var i in tones) {
			tones[i] = tones[i] / total;
		}
		
		var q = Math.sqrt( ((tones.anger * 3) ^ 2) + ((tones.disgut * 2.5) ^ 2) + ((tones.fear * 1.5) ^ 2) + ((tones.sadness * 2) ^ 2) + ((tones.joy - 1) ^ 2) );
		
		eth.createContract();
		eth.setData(JSON.stringify(tones), q);
		console.log(tones, q);
	});
});

