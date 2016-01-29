'use strict';

/**
 * @ngdoc function
 * @name mySiteApp.controller:ProfileCtrl
 * @description
 * # MainCtrl
 * Controller of the mySiteApp
 */
app.controller('ProfileCtrl', function ($scope, $window) {

  $scope.chart = {
    type: "GeoChart",
    data: [
      ['Locale', 'Visits'],
      ['US', 0],
      ['DE', 2],
      ['IE', 9],
      ['GB', 5],
      ['ES', 4],
      ['IT', 7],
      ['BE', 1],
      ['NL', 7],
      ['FR', 0],
      ['BR', 2],
      ['CH', 4],
      ['HU', 5],
      ['IS', 3],
      ['LU', 3],
      ['RU', 1]
    ],
    options: {
    	legend:'none',
      colorAxis: {
        colors: ['#4bb5f3', '#FADC41', '#c44949', '#d74a12', '#0e9a0e', '#55c2ac', '#7c4b91', '#fadc41', '#0d6cca', '#7c4897']
      },
      displayMode: 'regions',
      enableRegionInteractivity: true,
    },
  };

	/*
  * Add Event Listener on Click of the Map => chartWrapper is used to pass the control
  * from the angularJS directive to the under original Google library!
  */
  $scope.readyHandler = function(chartWrapper) {
    $window.google.visualization.events.addListener(chartWrapper.getChart(), 'regionClick', function(r) {
      $scope.regionClick(r);
    });
  }

  /*
  * Function to manage the chart on click listener.
  */
  $scope.regionClick = function(region) {
    console.log(region.region);
  }
});
