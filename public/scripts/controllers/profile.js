'use strict';

/**
 * @ngdoc function
 * @name mySiteApp.controller:ProfileCtrl
 * @description
 * # MainCtrl
 * Controller of the mySiteApp
 */
app.controller('ProfileCtrl', function ($scope, $window, Travels) {

  //init
  $scope.albums = Travels.get({country:"ES"}, function(){});


  /*
  var photos = Travels.get({country:"ES", albumName:"Bilbao"}, function(){
    console.log(JSON.stringify(photos.data));
  });
  */


  /*
  * The list of CountryIDs is here: https://google-developers.appspot.com/chart/interactive/docs/gallery/geochart
  */
  $scope.chart = {
    type: "GeoChart",
    data: [
      ['Locale', 'Colour', {role: 'tooltip', p:{html:true}}],
      ['US', 0, ''],
      ['DE', 2, ''],
      ['IE', 9, ''],
      ['GB', 5, ''],
      ['ES', 4, ''],
      ['IT', 7, ''],
      ['BE', 1, ''],
      ['NL', 7, ''],
      ['FR', 0, ''],
      ['BR', 2, ''],
      ['CH', 4, ''],
      ['HU', 5, ''],
      ['IS', 3, ''],
      ['LU', 3, ''],
      ['RU', 1, '']
    ],
    options: {
    	legend:'none',
      colorAxis: {
        colors: ['#4bb5f3', '#FADC41', '#c44949', '#d74a12', '#0e9a0e', '#55c2ac', '#7c4b91', '#fadc41', '#0d6cca', '#7c4897']
      },
      displayMode: 'regions',
      enableRegionInteractivity: true,
      tooltip: {
        isHtml: true
      }
    }
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
    //console.log(region.region);
    var albums_found = Travels.get({country:region.region}, function(){
      if(albums_found.error == null){
        $scope.albums = albums_found;
      }
    }, function(e){
      console.log('Error: '+ e.data.message);
      $scope.albums = [];
    });
  }


  $scope.albumSelected = null;

  $scope.$watch('albumSelected', function(value) {
    if($scope.albumSelected != null){
      $scope.albums.data.forEach(function(album){
        if(album.path == value){
          //console.log(album.country);
          //console.log(album.name);
          var photos_found = Travels.get({country:album.country, albumName:album.name}, function(){
            //console.log(JSON.stringify(photos_found.data));
          });
        }
      });
    }
  });

});
