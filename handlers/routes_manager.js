(function() {

var helper = require("./helper"),
		async = require('async'),
		album_data = require("../data/album"),
		photo_data = require("../data/photo");

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
 * Photo class (Helper Class)
 */
function Photo (photo_data) {
    this.path = photo_data.albumID + photo_data.filename;
    this.pathThumbnail = photo_data.albumID + photo_data.thumbnail;
    this.date = photo_data.date;
    this.albumID = photo_data.albumID;
    this.description = photo_data.description;
    this.location = photo_data.location;
    this.orientation = photo_data.orientation;
    this._id = photo_data._id;
}
Photo.prototype._id = null;
Photo.prototype.path = null;
Photo.prototype.pathThumbnail = null;
Photo.prototype.date = null;
Photo.prototype.albumID = null;
Photo.prototype.location = null;
Photo.prototype.orientation = null;
Photo.prototype.description = null;

Photo.prototype.response_obj = function() {
    return {
        path: this.path,
        pathThumbnail: this.pathThumbnail,
        date: this.date,
        albumID: this.albumID,
        location: this.location,
        orientation: this.orientation,
        description: this.description
    };
};



/**
*	Functions to manage the URL calls (routes)
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


exports.getAlbumsByCountry = function(req, res){
	var country = req.params.country;
	album_data.albums_by_country(country, function(err, results){
		if(err){
			helper.send_failure(err, res);
		}else{
			if(results.length <= 0) {
				helper.send_failure(helper.no_albums_by_country(), res);
			}
			else{
				var albums = [];
				results.forEach(function(album){
					albums.push(new Album(album).response_obj());
				});
				helper.send_success(albums, res);
			}
		}
	});
}


exports.getPhotos = function(req, res){
	var country = req.params.country;
	var albumName = req.params.albumName;

	async.waterfall([
			function(cb){
				album_data.album_by_country_and_by_name(country, albumName, cb);
			},
			function(album_found, cb){
				if(Object.keys(album_found).length === 0){
					cb(helper.no_albums_by_country());
					//I use return in order not to procede in the "waterfall" chain but
					//call directly the final function (cb) and send to the client the error!
					return;
				}
				else{
					var album = new Album(album_found);
					photo_data.photos_by_album(album.path, cb);
				}
			},
			function(photos_found, cb){
				if(Object.keys(photos_found).length === 0){
					cb(helper.no_photos_by_album());
					return;
				}
				else{
					var photos = [];
					photos_found.forEach(function(photo){
						photos.push(new Photo(photo).response_obj());
					});
					cb(null, photos);
				}
			}
		],
		function(err, results){ //this is cb!
			if(err){
				helper.send_failure(err, res);
			}
			else{
				helper.send_success(results, res);
			}
		}
	);
}


exports.pageNotFound = function(req, res){
	var error = helper.error(404, "Page Not Found!");
	helper.send_failure(error, res);
}

})();