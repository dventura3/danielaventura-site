/*
*	Questa View gestisce la COLLECTION di albums e gli eventi ad essa associati
*/

var AppView = Backbone.View.extend({

	events : {
		"click #new-album-save" : "createAlbum"
	},

	initialize: function() { 
    var albums = this.collection;

    _.bindAll(this, 'addOne', 'addAll');

    //identifico il campo di testo 
    //con il titolo del todo
    //per usarlo più avanti
//    this.$input = this.$("#new-todo");  //jquery classico

    //resto in ascolto per l'aggiunta di uno o più album
    albums.bind('add',     this.addOne); //se nella collection è stato inserito un nuovo model => esegui this.addOne
    albums.bind('fetch',   this.addAll); //usato solo una volta all'inizio quando l'app parte (invocato nel main.js)
  },

	createAlbum : function(){
		var name = this.$("#new-album-name").val();
		var country = this.$("#new-album-country").val();
		var year = this.$("#new-album-year").val();
		var path = this.$("#new-album-path").val();

		this.collection.create({
			name : name,
			country : country,
			year : year,
			path : path
		});

		this.$("#new-album-name").val('');
		this.$("#new-album-country").val('');
		this.$("#new-album-year").val('');
		this.$("#new-album-path").val('');
	},

	//aggiunta di un album
  addOne: function(album) {
/*
  	var albums = JSON.parse(JSON.stringify(albums_obj)).data;

  	albums.forEach(function(album){
  		console.log("This is one album: " + JSON.stringify(album));
  		var view = new AlbumView({model: album});
  		this.$("#albums-list").append( view.render().el );
  	});
*/
    //album è un nuovo modello da aggiungere alla collection (è come istanziare un oggetto di tipo Album)
    //questa è la view per 1 e un solo album!
    var view = new AlbumView({model: album});

    //appendo alla lista il nuovo album dal punto di vista grafico!
    this.$("#albums-list").append( view.render().el );
  },

  //reset di tutti gli album
  addAll: function() {
  	//this.collection == var albums (dell'initialize)
    this.collection.each(this.addOne);
  }

});