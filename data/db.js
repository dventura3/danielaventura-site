var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    async = require('async'),
    local = require("../local.config");


var host = local.config.db_config.host
    ? local.config.db_config.host
    : 'localhost';
var port = local.config.db_config.port
    ? local.config.db_config.port
    : Connection.DEFAULT_PORT;
var ps = local.config.db_config.poolSize
    ? local.config.db_config.poolSize : 5;


/*
* w:1 => significa che bisogna aspettare la conferma dell'esecuzione di
				 almeno 1 SCRITTURA prima di chiamare la callback (con replicazione
				 il valore di "w" si potrebbe aumentare)
* poolSize => indica il numero di connessioni che in contemporanea mongoDB
							può gestire. Indica il numero di connessioni attive.
*/
var db = new Db('dvsite', 
							new Server(host, port, { auto_reconnect: true, poolSize: ps}),
							{ w: 1 }
				 );

/*
* 1. Open DB
* 2. Open/Create the db "albums"
* 3. Export the opened/creted db.albums + Open/Create the db "photos"
* 4. Export the opened/creted db.photos
* 5. Callback -> in server.js
*/
exports.init = function (callback) {
    async.waterfall([
        // 1. open database connection
        function (cb) {
          console.log("\n** 1. open db");
          db.open(cb);
        },

        // 2. create collections for our albums and photos. if
        //    they already exist, then we're good.
        function (db_conn, cb) {
          console.log("\n** 2. create/open albums collections.");
          db.collection("albums", cb);
        },

        function (albums_coll, cb) {
        	console.log("\n** 3. create/open photos collections.");
          exports.albums = albums_coll;
          db.collection("photos", cb);
        },

        function (photos_coll, cb) {
          exports.photos = photos_coll;
          cb(null);
        }
    ], callback);
};


exports.albums = null;
exports.photos = null;
