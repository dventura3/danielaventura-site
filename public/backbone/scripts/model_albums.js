var Album = Backbone.Model.extend({
 
    //attributi di default del model
    defaults: {
        name : "",
        year : "",
        path : "",
        country : ""
    },
 
    //viene invocata tipo costruttore
    //quindi se non c'è "name", allora bisonga settarne il valore di default...etc.
    initialize: function() {
        if (!this.get("name")) {
            this.set({"name": this.defaults.name});
        }
        if (!this.get("year")) {
            this.set({"year": this.defaults.year});
        }
        if (!this.get("path")) {
            this.set({"path": this.defaults.path});
        }
        if (!this.get("country")) {
            this.set({"country": this.defaults.country});
        }    
    },
 
    //funzione chiamata quando vogliamo eliminare un album
    clear: function() {
        //distrugge il model
        this.destroy();
    }
});