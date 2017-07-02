const eth = require(__dirname + "/../models/ethereum.js");
const watson = require(__dirname + "/../models/watson.js");
const mongo = require(__dirname + "/../models/mongo.js");
const lib = require(__dirname + "/../models/functions.js");

exports.main = function(req, res) {
	res.render('pages/index');
};

exports.store_sentences = function(req, res){
	var msgtype = req.body.msgtype,
		msg = req.body.msg,
		colname;

	switch(msgtype) {
		case 'twitter':
			colname = "twitter" + lib.getDateForNames();
			break;
		default:
			colname = "sentences" + lib.getDateForNames();
			break;
	}
	
	mongo.run(function(db){
		var col = db.collection(colname);
		col.insertOne({data: msg, dateAdded: new Date()}, function(err, result){
			if(err) { throw err; }
			
console.log(result);
			res.redirect('/api');
		});	
	});
};

exports.store_hashtags = function(req, res){
	res.redirect('pages/api');
};

exports.settest = function(req, res) {
	eth.createContract();
	eth.setData("test, test");
res.render('pages/index');
};


exports.api = function(req, res) {
	res.render('pages/api');
}

