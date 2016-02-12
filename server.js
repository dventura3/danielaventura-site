var express = require('express'),
    local = require("./local.config"),
    manager = require("./handlers/routes_manager"),
    db = require('./data/db.js'),
	bodyParser = require('body-parser');


/*--------------- Express Configuration -------------------*/

var app = express();

var SERVER_HOST = local.config.server_config.host
    ? local.config.server_config.host
    : 'localhost';

var SERVER_PORT = local.config.server_config.port
    ? local.config.server_config.port
    : 3300;

app.use(
    function crossOrigin(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With');

        if('OPTIONS' == req.method){
            res.send(200);
        }
        else
            next();
    }
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


/*--------------- Routes -------------------*/



app.get("/v1/albums", manager.getAlbums);
app.get("/v1/albums/:country", manager.getAlbumsByCountry);
app.get("/v1/albums/:country/:albumName", manager.getPhotos);

app.get("/v1/new_albums", manager.getNewAlbums);
app.post("/v1/new_albums", manager.postNewAlbums);

app.all("*", manager.pageNotFound);


db.init(function (err, results) {
    if (err) {
        console.error("** FATAL ERROR ON STARTUP: ");
        console.error(err);
        process.exit(-1);
    }
    //After having initialized my db, the server can start up!
    app.listen(SERVER_PORT, SERVER_HOST);
    console.log("** 4. server started!\n");
});


