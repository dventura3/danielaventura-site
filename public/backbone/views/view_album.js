/*
*	Questa View gestisce IL MODEL di albums e gli eventi associati solo allo specifico album
*/
var AlbumView = Backbone.View.extend({

	// Il tag creato dalla vista
  tagName:  "li",

  // ID dello script che contiene la vista
  template: '#item-template',

	events : {
		"click .album-destroy" : "removeAlbum"
	},

	initialize: function() {
    //precompilo il template (la stessa riga non c'è in view_index perchè nel momento dell'instanziazione
    //ho già passato "el")
    this.template = _.template($(this.template).html());

    //forzo il contesto di questi metodi della view
    _.bindAll(this, 'render', 'remove');

    //resto in ascolto nel caso il modello sia cancellato
    //e rimuovo anche la view dal DOM
    //.remove() è un metodo di default in Backbone.View
    this.model.bind('destroy', this.remove);
  },

  //metodo che stampa l'HTML della view
  render: function() {
    //estraggo gli attributi del modello
    var data = this.model.toJSON();

    //li inietto nell'elemento della view
    //this.$el.html(this.template());
    this.$el.html(this.template(data));

    //restituisco this per permettere
    //la concatenazione dei metodi      
    return this;
  },

	removeAlbum : function(){
		this.model.clear();
	}
});