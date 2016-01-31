(function() {

var db = require('./db.js'),
		async = require('async');

exports.version = "0.1.0";


/*
* - sort_name_field = the name of the field used to order the albums
* - sort_order_field = desc or asc?!
* - I will obtain something like this
albums : [
  {
  "_id" : "/images/travels/ES/Bilbao",
  "name" : "Bilbao-Internship",
  "year" : "2013",
  "country" : "ES"
  }
]
*/
exports.all_albums = function(sort_name_field, sort_order_field, cb){
	var sort = {};
	if(sort_order_field == 'a'){
		sort[sort_name_field] = 1;
	}
	else{ //sort_order_field == 'd'
		sort[sort_name_field] = -1;
	}

	db.albums.find()
					 .sort(sort)
					 .toArray(cb);
}


})();