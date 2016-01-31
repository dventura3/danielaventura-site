(function() {

var db = require('./db.js');

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


exports.albums_by_country = function(country_name, cb){
	db.albums.find({country:country_name})
					 .sort({year:-1})
					 .toArray(cb);
}


exports.album_by_country_and_by_name = function(country_name, album_name, cb){
	db.albums.findOne({"country":country_name, "name":album_name}, function(err, album_found){
		//if err is NOT null => cb is the final function in the waterfall chain
		//if err is null => cb is the next function in the waterfall chain
		cb(err, album_found);
	});
}


})();