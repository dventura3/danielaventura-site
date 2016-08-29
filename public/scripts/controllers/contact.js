'use strict';

/**
 * @ngdoc function
 * @name mySiteApp.controller:ProfileCtrl
 * @description
 * # MainCtrl
 * Controller of the mySiteApp
 */
angular.module('mySiteApp')
  .controller('ContactCtrl', ['$scope', function ($scope) {


    $scope.user = {};

    $scope.sendMessage = function(user){
    	$scope.user = user;
    	alert("Sorry, Not implemented yet!");
    }

  }]);
