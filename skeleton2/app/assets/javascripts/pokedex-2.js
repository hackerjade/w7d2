Pokedex.RootView.prototype.addToyToList = function (toy) {
  var toyContent = JST['toyListItem']({toy: toy});
  this.$pokeDetail.find('ul.toys').append(toyContent);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) { // III
  this.$toyDetail.empty();
  var detailContent = JST['toyDetail']({pokes: this.pokes, toy: toy});
  this.$el.find('div.toy-detail').append(detailContent);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $target = $(event.target);

  var toyId = $target.data('id');
  var pokemonId = $target.data('pokemon-id');

  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);

  this.renderToyDetail(toy);
};
