(function() {

var helper = require("./helper"),
		album_data = require("../data/album");

exports.version = "0.1.0";


/**
 * Album class (Helper Class)
 */
function Album (album_data) {
    this.name = album_data.name;
    this.year = album_data.year;
    this.path = album_data._id;
    this.country = album_data.country;
}

Album.prototype.name = null;
Album.prototype.year = null;
Album.prototype.path = null;
Album.prototype.country = null;

Album.prototype.response_obj = function () {
    return { name: this.name,
             year: this.year,
             path: this.path,
             country: this.country };
};



/**
*	Functions to manage the URL routes
*/


exports.getAlbums = function(req, res){
	album_data.all_albums("year", 'd', function(err, results){
		if(err){
			helper.send_failure(err, res);
		}else{
			var albums = [];
			results.forEach(function(album){
				albums.push(new Album(album).response_obj());
			});
			helper.send_success(albums, res);
		}
	});
}


exports.pageNotFound = function(req, res){
	var error = helper.error(404, "Page Not Found!");
	helper.send_failure(error, res);
}

})();