Pokedex.Router = Backbone.Router.extend({
  routes: {
    "pokemon/:pokemonId/toys/:toyId": "toyDetail",
    "pokemon/:id": "pokemonDetail",
    "": "pokemonIndex"
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(function () {
        this.pokemonDetail(id, callback)
      })
    } else {
      var pokemon = this._pokemonIndex.collection.get(id);
      this._pokemonDetail = new Pokedex.Views.PokemonDetail({
        model: pokemon
      });
      var $currentEl = this._pokemonDetail.render();
      $("#pokedex .pokemon-detail").html($currentEl.$el);
    }
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex({
      collection: new Pokedex.Collections.Pokemon()
    });
    this._pokemonIndex.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);

  },

  toyDetail: function (pokemonId, toyId) {
    this._pokemonDetail.model.toys()
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
