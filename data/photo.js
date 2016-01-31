(function() {

var db = require('./db.js');

exports.version = "0.1.0";


/*
I will obtain something like this:
photos : [
	{
		"_id" : ObjectId("56adcda937d91fec852b6051"),
		"filename" : "/001.jpg",
		"thumbnail" : "/thumbnail/001_min.png",
		"albumID" : "/images/travels/ES/Bilbao",
		"date" : "03/05/2014",
		"description" : "View of Guggheneim Museum from a bridge",
		"location" : "Guggheneim, Bilbao",
		"orientation" : "h"
	}
]
*/
exports.photos_by_album = function(albumIDToFind, cb){
	db.photos.find({albumID:albumIDToFind})
					 .sort({date:1})
					 .toArray(cb);
}


})();