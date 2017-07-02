const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var db = null, calls = [];


function connect() {
	if(db !== null) { return; }

	MongoClient.connect('mongodb://localhost:27017/sentigraph', function(err, d) {
		assert.equal(null, err);
		console.log("Connected correctly to server");

		db = d;
		calls.forEach(function(item) {
			item.f.apply(this, [db, item.cb]);
		});
  
	});
}

exports.run = function(f, cb){
	connect();

	if(db !== null) {
		f.apply(this, [db,cb]);
	} else {
		calls.push({f : f, cb : cb});
	}
};

exports.close = function() {
	db.close();
}

