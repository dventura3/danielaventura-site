//server communication in order to obtain albums and photos

var app = angular.module('mySiteApp');

//"/v1/albums/:country/:albumName"

var HOST = "localhost";
var PORT = "3300";


var url = "http://" + HOST + ":" + PORT + '/v1/albums/:country/:albumName';

app.factory('Travels', ['$resource', function ($resource) {
	return $resource(url, {});
}]);
