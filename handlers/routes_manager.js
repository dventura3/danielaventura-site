
var helper = require("./helper");


exports.getAlbums = function(req, res){
	var tmpData = {"pippo" : "pappo"};
	helper.send_success(tmpData, res);
}


exports.pageNotFound = function(req, res){
	var error = helper.error(404, "Page Not Found!");
	helper.send_failure(error, res);
}