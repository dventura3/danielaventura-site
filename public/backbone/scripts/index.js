jQuery(function ($) {

    //creo una nuova collezione
     var albums = new AlbumList();

 
     //creo una nuova vista per l'applicazione
     var app = new AppView({
            collection : albums,
            //usa questo elemento come contenitore
            el: $("#container-albums") 
    });

    //aggiungo gli album che vengono restituiti dal server (che saranno i models di default).
    albums.fetch();

});