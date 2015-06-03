Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({pokemon: pokemon});
    this.$el.append(content);
    return this;
  },

  refreshPokemon: function (callback, options) {
    this.collection.fetch({
       success: function() {
         if (callback) {
           callback();
         }
       },
       reset: true
       });

    return this.collection;
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokeId = $target.data('id');
    var pokemon = this.collection.get(pokeId);
    Backbone.history.navigate('/pokemon/' + pokeId, {trigger: true});
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li": "selectToyFromList"
  },

  refreshPokemon: function (options) {
    options.pokemon.fetch({
      success: function() {
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    var content = JST['pokemonDetail']({pokemon: this.model});
    this.$el.html(content);

      debugger
    this.model.toys().each(function (toy) {
      var content = JST['toyListItem']({toy: toy});
      this.$el.find('.toys').append(content);
    }.bind(this));

    return this;
  },

  selectToyFromList: function (event) {
    var $target = $(event.target);
    var toyId = $target.data('id');
    var pokemonId = $target.data('pokemon-id');
    // var pokemon = this.model;
    var toy = this.model.toys().get(toyId);

    Backbone.history.navigate('/pokemon/' + pokeId + '/toys/' + toyId, {trigger: true})
    // var toyDetail = new Pokedex.Views.ToyDetail();
    // $('#pokedex .toy-detail').append(toyDetail);
    // toyDetail.render(toy);
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function (toy) {
    var content = JST["toyDetail"]({pokes: [], toy: toy});
    this.$el.html(content);
    return this;
  }
});

//
// $(function () {
//   var pokemons = new Pokedex.Collections.Pokemon();
//   var pokemonIndex = new Pokedex.Views.PokemonIndex({
//     collection: pokemons
//   });
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
