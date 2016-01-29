'use strict';

/**
 * @ngdoc function
 * @name mySiteApp.controller:ProfileCtrl
 * @description
 * # MainCtrl
 * Controller of the mySiteApp
 */
app.controller('ProfileCtrl', function ($scope, $window) {
    this.pippo = {
    	text : "CIAO"
    }


    this.chart = {
	    type: "GeoChart",
	    data: [
	      ['Locale', 'Visits'],
	      ['United States', 100],
	      ['Germany', 200],
	      ['China', 300]
	    ],
	    options: {
	      width: 600,
	      height: 300,
	      chartArea: {
	        left: 10,
	        top: 10,
	        bottom: 0,
	        height: "100%"
	      },
	      colorAxis: {
	        colors: ['#aec7e8', '#1f77b4']
	      },
	      displayMode: 'regions',
	      enableRegionInteractivity: true,
	    },
	  };

	var that = this;
	  /*
   * **************************************************************
   */
  this.readyHandler = function(chartWrapper) {
  	console.log("Qui ci sono!");
      $window.google.visualization.events.addListener(chartWrapper.getChart(), 'regionClick', function(r) {
	      that.regionClick(r);
	    });
    }
    /*
     * **************************************************************
     */
  this.regionClick = function(region) {
  	console.log("Event!");
    alert(region.region);
  }
});
