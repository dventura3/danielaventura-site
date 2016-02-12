var AlbumList = Backbone.Collection.extend({
 
    //model di riferimento
    model: Album,
 
    url: '/v1/new_albums'
});